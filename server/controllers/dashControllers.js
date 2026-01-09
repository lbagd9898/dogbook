import { prisma } from "../prismaClient.js";

export async function getPosts(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  console.log(user);
  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
  });
  return res.status(200).json({ posts });
}
