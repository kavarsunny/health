const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/ecommerce';

async function setRoles() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;

  // Set farmer role
  const farmer = await db.collection('users').findOneAndUpdate(
    { email: 'farmer@test.com' },
    { $set: { role: 'farmer' } },
    { returnDocument: 'after' }
  );
  console.log('Farmer user role:', farmer?.role || 'not found - need to register first');

  // Set superadmin role
  const superadmin = await db.collection('users').findOneAndUpdate(
    { email: 'superadmin@test.com' },
    { $set: { role: 'superadmin' } },
    { returnDocument: 'after' }
  );
  console.log('SuperAdmin user role:', superadmin?.role || 'not found - need to register first');

  // List all users to confirm
  const users = await db.collection('users').find({}, { projection: { name: 1, email: 1, role: 1 } }).toArray();
  console.log('\nAll users in DB:');
  users.forEach(u => console.log(` - ${u.name} | ${u.email} | role: ${u.role}`));

  await mongoose.disconnect();
  console.log('\nDone!');
}

setRoles().catch(console.error);
