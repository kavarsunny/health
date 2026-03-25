import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('PostgreSQL Connected via Prisma');
  } catch (error) {
    console.error('PostgreSQL Connection Error:', error);
    process.exit(1);
  }
};

export default prisma;
