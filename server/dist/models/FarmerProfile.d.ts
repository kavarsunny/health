import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IFarmerProfile, {}, {}, {}, mongoose.Document<unknown, {}, IFarmerProfile, {}, mongoose.DefaultSchemaOptions> & IFarmerProfile & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IFarmerProfile>;
export default _default;
//# sourceMappingURL=FarmerProfile.d.ts.map