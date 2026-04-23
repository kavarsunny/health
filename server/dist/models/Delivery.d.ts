import mongoose, { Document } from 'mongoose';
export interface IDelivery extends Document {
    order: mongoose.Types.ObjectId;
    deliveryStatus: 'Pending' | 'Assigned' | 'In Transit' | 'Delivered';
    courierPartner?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IDelivery, {}, {}, {}, mongoose.Document<unknown, {}, IDelivery, {}, mongoose.DefaultSchemaOptions> & IDelivery & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IDelivery>;
export default _default;
//# sourceMappingURL=Delivery.d.ts.map