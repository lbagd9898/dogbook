import { prisma } from "./prismaClient.js";
import { faker } from "@faker-js/faker";

async function main() {
  // Get all users from the database
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log("No users found. Seed users first!");
    return;
  }

  // Number of posts to create
  const POST_COUNT = 20;

  const posts = [];

  for (let i = 0; i < POST_COUNT; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    posts.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(2),
      authorId: randomUser.id,
      date: faker.date.past(1), // random date in the past year
    });
  }

  // Insert posts into DB
  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true, // optional
  });

  console.log(`${POST_COUNT} posts created successfully!`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
