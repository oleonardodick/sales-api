import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = async function testTeardown() {
  console.log('Excluindo o schema test');

  await prisma.$executeRaw`DROP SCHEMA TEST CASCADE`;
  await prisma.$disconnect();
};
