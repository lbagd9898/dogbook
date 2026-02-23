import { prisma } from "../prismaClient.js";
import { getComments, getLikes } from "./dashControllers.js";

export async function getUser(req, res) {
  try {
    console.log("get user reached");
    const { userId } = req.params;

    console.log(userId);
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

    const posts = await getUserPosts(userId);
    console.log(posts);
    return res.status(200).json({ user, posts });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
}

async function getUserPosts(userId) {
  console.log("get user posts reached");

  const posts = await prisma.post.findMany({
    where: {
      authorId: Number(userId),
    },
    orderBy: {
      date: "desc",
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

  const postIds = posts.map((post) => post.id);

  console.log(postIds);

  const comments = await getComments(postIds);

  const likes = await getLikes(postIds);

  const detailedPosts = posts.map((post) => ({
    ...post,
    likes: likes[post.id],
    comments: comments[post.id],
  }));
  return detailedPosts;
}
