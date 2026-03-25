import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'admin' },
  });

  if (existingAdmin) {
    console.log(`An admin user already exists: Email - ${existingAdmin.email}`);
    // We cannot see the password since it's hashed, so we'll just reset it or tell the user to use it.
    // Let's create a guaranteed one for testing: 
  }

  const passwordHash = await bcrypt.hash('admin123', 10);
  const email = 'admin@admin.com';

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: passwordHash,
      role: 'admin',
    },
    create: {
      name: 'Admin User',
      email,
      password: passwordHash,
      role: 'admin',
    },
  });

  console.log('ADMIN_CREDENTIALS_CREATED');
  console.log(`Email: ${user.email}`);
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
