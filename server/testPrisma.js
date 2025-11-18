const prisma = require("./prismaClient.js");

async function testConnection() {
  try {
    // Try a simple query: count users in the User table
    const count = await prisma.user.count();
    console.log(`✅ Successfully connected! User table has ${count} records.`);
  } catch (error) {
    console.error("❌ Prisma failed to connect to the database:");
    console.error(error);
  } finally {
    await prisma.$disconnect(); // close the connection
  }
}

// Run the test
testConnection();
