import { prisma } from "../prismaClient.js";

export async function getUser(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

export async function isCurrUserFollowing(userId, currUserId) {
  const follow = await prisma.follow.findFirst({
    where: {
      followerId: currUserId,
      followedId: userId,
    },
  });
  return !!follow;
}
