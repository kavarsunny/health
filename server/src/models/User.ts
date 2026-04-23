import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email?: string;
  phone?: string;
  password?: string;
  address?: string;
  role: 'customer' | 'admin' | 'farmer' | 'superadmin';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    phone:    { type: String, unique: true, sparse: true, trim: true },
    password: { type: String }, // Optional if OTP login used
    address:  { type: String },
    role:     { type: String, enum: ['customer', 'admin', 'farmer', 'superadmin'], default: 'customer' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
