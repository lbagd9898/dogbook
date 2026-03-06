import { prisma } from "../prismaClient.js";

export async function getUser(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}
