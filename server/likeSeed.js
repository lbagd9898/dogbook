import { prisma } from "./prismaClient.js"; // use your shared PrismaClient
import { faker } from "@faker-js/faker";

async function main() {
  // Fetch all users and posts
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();

  if (users.length === 0 || posts.length === 0) {
    console.log("No users or posts found. Seed users and posts first!");
    return;
  }

  const LIKE_COUNT = 100; // adjust how many likes you want
  const likes = [];
  const existingPairs = new Set(); // to prevent duplicates

  for (let i = 0; i < LIKE_COUNT; i++) {
    let user, post, pairKey;

    // pick a random user and post until we get a unique combination
    do {
      user = users[Math.floor(Math.random() * users.length)];
      post = posts[Math.floor(Math.random() * posts.length)];
      pairKey = `${user.id}-${post.id}`;
    } while (existingPairs.has(pairKey));

    existingPairs.add(pairKey);

    likes.push({
      userId: user.id,
      postId: post.id,
      date: faker.date.past(1), // random date in the past year
    });
  }

  await prisma.like.createMany({
    data: likes,
    skipDuplicates: true, // just in case
  });

  console.log(`${LIKE_COUNT} likes created successfully!`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
