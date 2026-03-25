const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@admin.com';
  const passwordHash = await bcrypt.hash('admin123', 10);

  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (user) {
    user = await prisma.user.update({
      where: { email },
      data: { password: passwordHash, role: 'admin' }
    });
  } else {
    user = await prisma.user.create({
      data: {
        name: 'Site Admin',
        email,
        password: passwordHash,
        role: 'admin'
      }
    });
  }

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
