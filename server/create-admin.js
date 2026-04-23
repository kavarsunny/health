const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
const client = new MongoClient(uri);

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  const email = 'admin@admin.com';

  await client.connect();
  const db = client.db();
  const users = db.collection('User');

  const existing = await users.findOne({ email });
  let user;

  if (existing) {
    await users.updateOne(
      { email },
      { $set: { password: passwordHash, role: 'admin', updatedAt: new Date() } }
    );
    user = await users.findOne({ email });
  } else {
    const result = await users.insertOne({
      name: 'Site Admin',
      email,
      password: passwordHash,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    user = await users.findOne({ _id: result.insertedId });
  }

  console.log('ADMIN_CREDENTIALS_CREATED');
  console.log(`ID: ${user._id}`);
  console.log(`Email: ${user.email}`);
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.close();
  });
