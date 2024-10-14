import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`; // Limpar tabelas
});

afterAll(async () => {
  await prisma.$disconnect();
});
