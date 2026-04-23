import mongoose, { Schema, Document } from 'mongoose';

export interface IDelivery extends Document {
  order: mongoose.Types.ObjectId;
  deliveryStatus: 'Pending' | 'Assigned' | 'In Transit' | 'Delivered';
  courierPartner?: string;
  createdAt: Date;
  updatedAt: Date;
}

const deliverySchema = new Schema<IDelivery>(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    deliveryStatus: { type: String, enum: ['Pending', 'Assigned', 'In Transit', 'Delivered'], default: 'Pending' },
    courierPartner: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IDelivery>('Delivery', deliverySchema);
