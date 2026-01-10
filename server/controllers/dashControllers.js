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
      createdAt: "desc", // optional but usually expected
    },
  });

  return res.status(200).json({ posts });
}
