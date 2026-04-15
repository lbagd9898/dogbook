import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

const DOG_BREEDS = [
  "Labrador Retriever",
  "French Bulldog",
  "Golden Retriever",
  "German Shepherd",
  "Poodle",
  "Bulldog",
  "Beagle",
  "Rottweiler",
  "Dachshund",
  "Shih Tzu",
  "Siberian Husky",
  "Border Collie",
  "Australian Shepherd",
  "Pomeranian",
  "Corgi",
];

const POST_TITLES = [
  "Look at my pup!",
  "Afternoon at the dog park",
  "New trick unlocked!",
  "Bath day survived",
  "Zoomies at 3am again",
  "Who's a good boy?",
  "Snack time!",
  "Hiking with my best friend",
  "First vet visit",
  "Caught in the act",
  "Monday morning mood",
  "Living their best life",
];

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create 10 users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user = await prisma.user.create({
      data: {
        username: faker.internet
          .username({ firstName, lastName })
          .toLowerCase(),
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        password: hashedPassword,
        breed: faker.helpers.arrayElement(DOG_BREEDS),
        picUrl: `https://picsum.photos/seed/${faker.string.alphanumeric(
          6
        )}/200/200`,
      },
    });
    users.push(user);
    console.log(`Created user: ${user.username}`);
  }

  // Create follows — each user follows 3–6 random others
  for (const user of users) {
    const others = users.filter((u) => u.id !== user.id);
    const toFollow = faker.helpers.arrayElements(
      others,
      faker.number.int({ min: 3, max: 6 })
    );
    for (const followed of toFollow) {
      await prisma.follow.upsert({
        where: {
          followerId_followedId: {
            followerId: user.id,
            followedId: followed.id,
          },
        },
        update: {},
        create: { followerId: user.id, followedId: followed.id },
      });
    }
  }
  console.log("Created follows");

  // Create 3–5 posts per user
  const posts = [];
  for (const user of users) {
    const count = faker.number.int({ min: 3, max: 5 });
    for (let i = 0; i < count; i++) {
      const post = await prisma.post.create({
        data: {
          title: faker.helpers.arrayElement(POST_TITLES),
          content: faker.lorem.sentences({ min: 1, max: 4 }),
          authorId: user.id,
          imageUrl:
            Math.random() > 0.4
              ? `https://picsum.photos/seed/${faker.string.alphanumeric(
                  8
                )}/600/400`
              : null,
        },
      });
      posts.push(post);
    }
  }
  console.log(`Created ${posts.length} posts`);

  // Create 0–4 comments per post from random users
  for (const post of posts) {
    const commentCount = faker.number.int({ min: 0, max: 4 });
    const commenters = faker.helpers.arrayElements(users, commentCount);
    for (const commenter of commenters) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.sentences({ min: 1, max: 2 }),
          authorId: commenter.id,
          postId: post.id,
        },
      });
    }
  }
  console.log("Created comments");

  // Create likes — random users like random posts
  for (const post of posts) {
    const likers = faker.helpers.arrayElements(
      users,
      faker.number.int({ min: 0, max: 6 })
    );
    for (const liker of likers) {
      await prisma.like.upsert({
        where: { userId_postId: { userId: liker.id, postId: post.id } },
        update: {},
        create: { userId: liker.id, postId: post.id },
      });
    }
  }
  console.log("Created likes");

  console.log(
    "Done! Seeded 10 users with posts, comments, follows, and likes."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
