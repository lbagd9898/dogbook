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
  const followingIds = following.map((user) => user.id);
  const somePosts = [];
  for (let i = 0; i < followingIds.length; i++) {
    const morePosts = await prisma.post.findMany({
      where: {
        authorId: followingIds[i],
      },
    });
    somePosts.push(morePosts);
  }
  const posts = somePosts.flat();
  return res.status(200).json({ posts });
}
