import { prisma } from "../prismaClient.js";

export async function getUser(req, res) {
  try {
    const { userId } = req.params;

    console.log(userId);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
}
