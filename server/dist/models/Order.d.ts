import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}, mongoose.DefaultSchemaOptions> & IOrder & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IOrder>;
export default _default;
//# sourceMappingURL=Order.d.ts.map