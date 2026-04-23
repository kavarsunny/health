import mongoose, { Document } from 'mongoose';
export interface IReview {
    user: mongoose.Types.ObjectId;
    name: string;
    rating: number;
    comment: string;
}
export interface IProduct extends Document {
    farmer: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    images: string[];
    unit: string;
    category: string;
    brand?: string;
    stock: number;
    rating: number;
    numReviews: number;
    reviews: IReview[];
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
export default _default;
//# sourceMappingURL=Product.d.ts.map