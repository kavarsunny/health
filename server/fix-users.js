const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = 'mongodb://localhost:27017/ecommerce';

async function fixUsers() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB\n');
  const db = mongoose.connection.db;

  // List all users first
  const users = await db.collection('users').find({}, {
    projection: { name: 1, email: 1, role: 1 }
  }).toArray();
  console.log('=== Current Users ===');
  users.forEach(u => console.log(` - ${u.name} | ${u.email} | role: ${u.role}`));

  // Reset farmer@test.com password to 'password123' and set role
  const hashedPw = await bcrypt.hash('password123', 12);
  await db.collection('users').updateOne(
    { email: 'farmer@test.com' },
    { $set: { password: hashedPw, role: 'farmer' } }
  );
  console.log('\n✅ farmer@test.com: password reset to "password123", role set to "farmer"');

  await db.collection('users').updateOne(
    { email: 'superadmin@test.com' },
    { $set: { password: hashedPw, role: 'superadmin' } }
  );
  console.log('✅ superadmin@test.com: password reset to "password123", role set to "superadmin"');

  await mongoose.disconnect();
  console.log('\nDone! Try logging in now.');
}

fixUsers().catch(console.error);
