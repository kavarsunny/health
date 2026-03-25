import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const orderItemSchema = new Schema<IOrderItem>({
  product:  { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  quantity: { type: Number, required: true },
  price:    { type: Number, required: true },
  image:    { type: String, default: '' },
});

const orderSchema = new Schema<IOrder>(
  {
    user:            { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items:           [orderItemSchema],
    shippingAddress: {
      fullName:   { type: String, required: true },
      address:    { type: String, required: true },
      city:       { type: String, required: true },
      postalCode: { type: String, required: true },
      country:    { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice:    { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice:      { type: Number, required: true },
    totalPrice:    { type: Number, required: true },
    isPaid:        { type: Boolean, default: false },
    paidAt:        { type: Date },
    isDelivered:   { type: Boolean, default: false },
    deliveredAt:   { type: Date },
    status:        { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
