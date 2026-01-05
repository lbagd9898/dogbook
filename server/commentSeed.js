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

  const COMMENT_COUNT = 50; // adjust number of comments
  const comments = [];

  for (let i = 0; i < COMMENT_COUNT; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPost = posts[Math.floor(Math.random() * posts.length)];

    comments.push({
      content: faker.lorem.sentences(2), // 2 sentences of text
      authorId: randomUser.id,
      postId: randomPost.id,
      date: faker.date.past(1), // random date in the past year
    });
  }

  await prisma.comment.createMany({
    data: comments,
    skipDuplicates: true, // optional
  });

  console.log(`${COMMENT_COUNT} comments created successfully!`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
