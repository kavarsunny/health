const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('ecommerce');
    const collection = db.collection('User');

    const email = 'admin@admin.com';
    const passwordHash = await bcrypt.hash('admin123', 10);

    // Check if exists
    const existing = await collection.findOne({ email });
    if (existing) {
      await collection.updateOne({ email }, { $set: { password: passwordHash, role: 'admin' } });
      console.log('Admin user updated.');
    } else {
      await collection.insertOne({
        name: 'Site Admin',
        email,
        password: passwordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Admin user created.');
    }

    console.log('Email: ' + email);
    console.log('Password: admin123');
  } finally {
    await client.close();
  }
}

main().catch(console.error);
