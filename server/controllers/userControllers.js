import { prisma } from "../prismaClient.js";
import { getUser } from "./userHelpers.js";
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

    user["following"] = followingCount;
    user["followers"] = followersCount;

    //get users posts
    const posts = await getUserPosts(userId, currUserId);
    console.log(posts);
    console.log(user);
    return res.status(200).json({ user, posts });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e });
  }
}

async function getUserPosts(userId, currUserId) {
  console.log("get user posts reached");

  const posts = await getPosts([userId]);
  const postIds = posts.map((post) => post.id);
  console.log(postIds);

  const comments = await getComments(postIds);

  const likes = await getLikes(postIds);

  console.log(likes);

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
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }

    //how many are they following
    const following = await prisma.follow.count({
      where: {
        followerId: user.id,
      },
    });

    const followers = await prisma.follow.count({
      where: {
        followedId: user.id,
      },
    });

    user["following"] = following;

    user["followers"] = followers;

    const posts = await getUserPosts(userId, userId);

    return res.status(200).json({ user, posts });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "server error" });
  }
}
