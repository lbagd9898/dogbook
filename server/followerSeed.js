import { prisma } from "./prismaClient.js";

async function main() {
  const userIds = [];
  const users = await prisma.user.findMany();

  for (let i = 0; i < users.length; i++) {
    userIds.push(users[i].id);
  }

  console.log(users);
  console.log(userIds);

  for (let i = 0; i < userIds.length; i++) {
    const userIdsminusCurreUserId = userIds.filter((x, j) => j !== i);
    const shuffled = [...userIdsminusCurreUserId].sort(
      () => Math.random() - 0.5
    );
    const randomThree = shuffled.slice(0, 3);
    //enter followers into the db
    for (let j = 0; j < randomThree.length; j++) {
      await prisma.follow.create({
        data: {
          followerId: userIds[i],
          followedId: randomThree[j],
        },
      });
    }
  }
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
