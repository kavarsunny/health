import mongoose, { Schema, Document } from 'mongoose';

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

const reviewSchema = new Schema<IReview>(
  {
    user:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name:    { type: String, required: true },
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new Schema<IProduct>(
  {
    farmer:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name:        { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true, default: 0 },
    images:      [{ type: String, required: true }],
    unit:        { type: String, default: 'kg' },
    category:    { type: String, required: true },
    brand:       { type: String },
    stock:       { type: Number, required: true, default: 0 },
    rating:      { type: Number, required: true, default: 0 },
    numReviews:  { type: Number, required: true, default: 0 },
    status:      { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    reviews:     [reviewSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
