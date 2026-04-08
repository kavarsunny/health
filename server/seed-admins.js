const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/ecommerce';

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['user', 'admin', 'farmer', 'superadmin'], default: 'user' },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

async function createSuperAdmin() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB\n');

  const email    = 'admin@test.com';
  const password = 'password123';
  const hash     = await bcrypt.hash(password, 10);

  const result = await User.findOneAndUpdate(
    { email },
    { name: 'Super Admin', email, password: hash, role: 'superadmin' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log('✅ Super Admin account created/updated!');
  console.log('──────────────────────────────────────');
  console.log(`  ID       : ${result._id}`);
  console.log(`  Email    : ${email}`);
  console.log(`  Password : ${password}`);
  console.log(`  Role     : superadmin`);
  console.log('──────────────────────────────────────');

  await mongoose.disconnect();
}

createSuperAdmin().catch((err) => { console.error(err); process.exit(1); });
