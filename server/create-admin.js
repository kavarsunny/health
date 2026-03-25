const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  const email = 'admin@admin.com';

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: passwordHash,
      role: 'admin',
    },
    create: {
      name: 'Site Admin',
      email,
      password: passwordHash,
      role: 'admin',
    },
  });

  console.log('ADMIN_CREDENTIALS_CREATED');
  console.log(`ID: ${user.id}`);
  console.log(`Email (ID): ${user.email}`);
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
