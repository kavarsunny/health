import mongoose, { Schema, Document } from 'mongoose';

export interface IReview {
  user: mongoose.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  numReviews: number;
  reviews: IReview[];
  farmerName?: string;
  mrp?: number;
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
    name:        { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true, min: 0 },
    image:       { type: String, default: '' },
    category:    { type: String, required: true },
    brand:       { type: String, default: '' },
    stock:       { type: Number, default: 0, min: 0 },
    rating:      { type: Number, default: 0 },
    numReviews:  { type: Number, default: 0 },
    reviews:     [reviewSchema],
    farmerName:  { type: String, default: '' },
    mrp:         { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
