import { PrismaClient } from '@prisma/client';
import { hashData } from '../src/utils/security/hashData.security';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: process.env.ADMIN_USER,
      email: process.env.ADMIN_EMAIL,
      password: await hashData(process.env.ADMIN_PASSWORD),
      role: 'ADMIN',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
