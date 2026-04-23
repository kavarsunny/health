import mongoose, { Schema, Document } from 'mongoose';

export interface IFarmerProfile extends Document {
  user: mongoose.Types.ObjectId;
  farmerType: string;
  whatsappNumber?: string;
  infoSource?: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  officeAddress: string;
  pincode: string;
  brandName?: string;
  registrationType?: string;
  website?: string;
  gstNumber?: string;
  yearlyTurnover?: string;
  organicCert?: string;
  fssaiCert?: string;
  about?: string;
  farmSizeAcres?: number;
  memberCount?: number;
  achievements?: string;
  images: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
}

const farmerProfileSchema = new Schema<IFarmerProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    farmerType: { type: String, required: true },
    whatsappNumber: { type: String },
    infoSource: { type: String },
    state: { type: String, required: true },
    district: { type: String, required: true },
    taluka: { type: String, required: true },
    village: { type: String, required: true },
    officeAddress: { type: String, required: true },
    pincode: { type: String, required: true },
    brandName: { type: String },
    registrationType: { type: String },
    website: { type: String },
    gstNumber: { type: String },
    yearlyTurnover: { type: String },
    organicCert: { type: String },
    fssaiCert: { type: String },
    about: { type: String },
    farmSizeAcres: { type: Number },
    memberCount: { type: Number },
    achievements: { type: String },
    images: [{ type: String }],
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  },
  { timestamps: true }
);

export default mongoose.model<IFarmerProfile>('FarmerProfile', farmerProfileSchema);
