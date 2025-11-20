import { prisma } from './prismaClient.js'

async function main() {
    try {
      // Test connection by fetching all users (replace 'User' with a model in your schema)
      const users = await prisma.user.findMany();
      console.log('Database connection works!');
      console.log('Users:', users);
    } catch (error) {
      console.error('Error connecting to database:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  main();