const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@admin.com';
  const passwordHash = await bcrypt.hash('admin123', 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: 'Site Admin',
        email,
        password: passwordHash,
        role: 'admin'
      }
    });

    console.log('ADMIN_CREDENTIALS_CREATED');
    console.log(`ID: ${user.id}`);
    console.log(`Email (ID): ${user.email}`);
    console.log('Password: admin123');
  } catch (e) {
    if (e.code === 'P2002') {
       console.log('Admin already exists.');
       const user = await prisma.user.findUnique({ where: { email } });
       if (user) {
         await prisma.user.update({ where: { email }, data: { password: passwordHash, role: 'admin' } });
         console.log('Password updated to admin123');
       }
    } else {
       console.log('ERR_MSG_START');
       console.log(e.message);
       console.log('ERR_MSG_END');
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
