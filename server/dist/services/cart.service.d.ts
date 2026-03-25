export declare const getCart: (userId: string) => Promise<{
    _id: string;
    items: ({
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            image: string;
            category: string;
            brand: string;
            stock: number;
            rating: number;
            numReviews: number;
        };
    } & {
        id: string;
        price: number;
        quantity: number;
        productId: string;
        cartId: string;
    })[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
    userId: string;
}>;
export declare const addToCart: (userId: string, productId: string, quantity: number) => Promise<{
    _id: string;
    items: ({
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            image: string;
            category: string;
            brand: string;
            stock: number;
            rating: number;
            numReviews: number;
        };
    } & {
        id: string;
        price: number;
        quantity: number;
        productId: string;
        cartId: string;
    })[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
    userId: string;
}>;
export declare const removeFromCart: (userId: string, productId: string) => Promise<{
    _id: string;
    items: ({
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            image: string;
            category: string;
            brand: string;
            stock: number;
            rating: number;
            numReviews: number;
        };
    } & {
        id: string;
        price: number;
        quantity: number;
        productId: string;
        cartId: string;
    })[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
    userId: string;
}>;
export declare const clearCart: (userId: string) => Promise<{
    _id: string;
    items: ({
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            image: string;
            category: string;
            brand: string;
            stock: number;
            rating: number;
            numReviews: number;
        };
    } & {
        id: string;
        price: number;
        quantity: number;
        productId: string;
        cartId: string;
    })[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
    userId: string;
} | null>;
//# sourceMappingURL=cart.service.d.ts.map