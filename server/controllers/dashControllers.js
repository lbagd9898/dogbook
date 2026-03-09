import { prisma } from "../prismaClient.js";
import cloudinary from "../cloudinary.js";
import {
  getFollowingUsers,
  getPosts,
  getComments,
  getLikes,
  areLikedByUser,
} from "./dashHelpers.js";

export async function getDashboard(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  const userId = req.user.id;
  const following = await getFollowingUsers(userId);

  //list of ids for everybody the user follows
  const followingIds = following.map((f) => f.followedId);

  //user should see their own posts too
  followingIds.push(userId);

  //get posts of all users currUser is following
  const posts = await getPosts(followingIds);
  const postIds = posts.map((post) => post.id);
  const comments = await getComments(postIds);

  const likes = await getLikes(postIds);

  const likeCounts = likes.reduce((acc, like) => {
    acc[like.postId] = (acc[like.postId] || 0) + 1;
    return acc;
  }, {});

  //get ids of posts that are liked by current user
  const likedByUser = areLikedByUser(likes, userId);

  const detailedPosts = posts.map((post) => ({
    ...post,
    likes: likeCounts[post.id],
    comments: comments[post.id],
    likedByUser: likedByUser.includes(post.id),
  }));
  console.log(detailedPosts);
  return res
    .status(200)
    .json({ posts: detailedPosts, user: req.user.username });
}

export async function postPost(req, res) {
  //get post content from form
  const title = req.body.title;
  const content = req.body.content;

  //get user from req object
  const user = req.user;
  console.log(user);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  //create post
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    console.log(newPost);
    return res.status(201).json({ newPost });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Database error" });
  }
}

export async function postUpdateLikes(req, res) {
  const { postId, liked } = req.body;
  const userId = req.user?.id;
  try {
    //if user liked post, add it to likes db
    if (liked) {
      const newLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      res.status(201).json(newLike);
    } else {
      //if user unlikes post
      const deleteLike = await prisma.like.deleteMany({
        where: {
          userId,
          postId,
        },
      });
      //if they can't find the like, notify client
      if (deleteLike.count === 0) {
        return res.status(404).json({ message: "like not found." });
      }
      res.status(200).json({ message: "like deleted" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function postComment(req, res) {
  //get user from req object and make sure user exists
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  try {
    const content = req.body.userComment;
    const postId = req.body.postId;
    const authorId = req.user.id;
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
    });

    console.log(comment);

    const allComments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        date: "asc",
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    console.log(allComments);

    return res.status(201).json({ allComments });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "failed to post comment" });
  }
}

export async function getFollowing(req, res) {
  console.log("following reached");
  const userId = req.user.id;

  try {
    //get all following relations where user is the follower
    const relations = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        followed: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    const following = relations.map((relation) => ({
      id: relation.followed.id,
      username: relation.followed.username,
    }));

    console.log(following);
    res.status(200).json({ following });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSinglePost(req, res) {
  const { postId } = req.params;

  console.log("post id", postId);

  const userId = req.user.id;

  console.log(userId);

  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
    include: {
      author: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
    orderBy: {
      date: "asc",
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  const likes = await prisma.like.findMany({
    where: {
      postId: Number(postId),
    },
    orderBy: {
      date: "desc",
    },
  });

  const isLikedByUser = likes.some((like) => like.userId === req.user.id);

  const likeCount = likes.length;

  console.log(post);
  console.log(comments);
  console.log(likes);
  console.log(likeCount);

  const detailedPost = { ...post, likes: likeCount, comments, isLikedByUser };
  console.log(detailedPost);
  return res.status(200).json({ post: detailedPost });
}

export async function uploadImage(req, res) {
  try {
    const fileBuffer = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${fileBuffer}`;
    const result = await cloudinary.uploader.upload(dataUri);
    console.log("success", result);
    res.json({ url: result.secure_url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Image upload failed" });
  }
}
