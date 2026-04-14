import { prisma } from "../prismaClient.js";
import { getUser, isCurrUserFollowing } from "./userHelpers.js";
import {
  getPosts,
  getComments,
  getLikes,
  getFollowingUsers,
  getFollowers,
  areLikedByUser,
} from "./dashHelpers.js";

export async function getUserData(req, res) {
  try {
    console.log("get user reached");
    const userId = Number(req.params.userId);
    const currUserId = req.user.id;

    console.log(userId);

    //get user object
    const user = await getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }
    console.log(user);

    //how many are they following and count
    const following = await getFollowingUsers(userId);
    const followingCount = following.length;

    //get how many followers they have and count
    const followers = await getFollowers(userId);
    const followersCount = followers.length;

    //returns if current user is following
    const isFollowing = await isCurrUserFollowing(userId, currUserId);

    console.log(isFollowing);
    user["following"] = followingCount;
    user["followers"] = followersCount;
    user["isFollowing"] = isFollowing;

    //get users posts
    const posts = await getUserPosts(userId, currUserId);
    console.log(user);
    return res.status(200).json({ user, posts });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
}

async function getUserPosts(userId, currUserId) {
  const posts = await getPosts([userId]);
  const postIds = posts.map((post) => post.id);

  const comments = await getComments(postIds);

  const likes = await getLikes(postIds);

  const likeCounts = likes.reduce((acc, like) => {
    acc[like.postId] = (acc[like.postId] || 0) + 1;
    return acc;
  }, {});

  const likedByUser = areLikedByUser(likes, currUserId);

  const detailedPosts = posts.map((post) => ({
    ...post,
    likes: likeCounts[post.id],
    comments: comments[post.id],
    likedByUser: likedByUser.includes(post.id),
  }));
  return detailedPosts;
}

export async function getMyUser(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = Number(req.user.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [following, followers, posts] = await Promise.all([
      prisma.follow.count({ where: { followerId: userId } }),
      prisma.follow.count({ where: { followedId: userId } }),
      getUserPosts(userId, userId),
    ]);

    return res.status(200).json({
      user: { ...user, following, followers },
      posts,
    });
  } catch (e) {
    console.error("Error in getMyUser:", e.message);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}

export async function updateUser(req, res) {
  const breed = req.body.breed ?? null;
  const imageUrl = req.body.imageUrl ?? null;

  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(breed && { breed }),
        ...(imageUrl && { picUrl: imageUrl }),
      },
    });
    res.json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Database error" });
  }
}

export async function toggleFollow(req, res) {
  const { userId: followedId, followedByUser } = req.body;
  const followerId = req.user.id;
  console.log(followedByUser);
  console.log(await isCurrUserFollowing(followedId, followerId));

  try {
    if (followedByUser) {
      await prisma.follow.delete({
        where: {
          followerId_followedId: {
            followerId,
            followedId,
          },
        },
      });
    } else {
      await prisma.follow.create({
        data: {
          followerId,
          followedId,
        },
      });
    }
    console.log("following toggled");
    res.json({ following: !followedByUser });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "db error" });
  }
}

export async function getSuggestions(req, res) {
  try {
    const userId = req.user.id;

    const followed = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followedId: true },
    });
    const followedIds = followed.map((f) => f.followedId);

    const users = await prisma.user.findMany({
      where: {
        id: { notIn: [...followedIds, userId] },
      },
      select: { id: true, username: true, picUrl: true, breed: true },
    });

    const suggestions = users.sort(() => Math.random() - 0.5).slice(0, 5);
    return res.status(200).json({ suggestions });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function searchUsers(req, res) {
  console.log("search user reached");
  const { username } = req.query;

  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
        mode: "insensitive",
      },
      NOT: { id: req.user.id },
    },
    select: {
      id: true,
      username: true,
      picUrl: true,
    },
  });

  res.json({ users });
}
