import { get } from "http";
import { prisma } from "../prismaClient.js";

export async function getPosts(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  const following = await prisma.follow.findMany({
    where: {
      followerId: user.id,
    },
  });
  console.log(following);
  const followingIds = following.map((f) => f.followedId);

  const posts = await prisma.post.findMany({
    where: {
      authorId: {
        in: followingIds,
      },
    },
    orderBy: {
      date: "desc", // optional but usually expected
    },
  });
  const postIds = posts.map((post) => post.id);
  const likes = await getLikes(postIds);
  const authors = await getAuthors(followingIds);

  console.log(likes);
  console.log(authors);
  console.log(posts);
  const detailedPosts = posts.map((post) => ({
    ...post,
    likes: likes[post.id],
    author: authors[post.authorId],
  }));

  console.log(detailedPosts);

  return res.status(200).json({ posts: detailedPosts });
}

async function getLikes(postIds) {
  const likes = await prisma.like.findMany({
    where: {
      postId: {
        in: postIds,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  const likeCount = likes.reduce((acc, like) => {
    acc[like.postId] != null ? (acc[like.postId] += 1) : (acc[like.postId] = 1);
    return acc;
  }, {});
  return likeCount;
}

async function getAuthors(authorIds) {
  const authors = await prisma.user.findMany({
    where: {
      id: {
        in: authorIds,
      },
    },
  });
  const authorKeys = authors.reduce((acc, user) => {
    acc[user.id] = user.username;
    return acc;
  }, {});
  return authorKeys;
}
