export declare const getAllProducts: (query: any) => Promise<{
    products: {
        _id: string;
        reviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            userId: string;
            productId: string;
            comment: string;
        }[];
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
    }[];
    page: number;
    totalPages: number;
    total: number;
}>;
export declare const getProductById: (id: string) => Promise<{
    _id: string;
    reviews: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        userId: string;
        productId: string;
        comment: string;
    }[];
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
}>;
export declare const createProduct: (data: any) => Promise<{
    _id: string;
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
}>;
export declare const updateProduct: (id: string, data: any) => Promise<{
    _id: string;
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
}>;
export declare const deleteProduct: (id: string) => Promise<{
    _id: string;
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
}>;
//# sourceMappingURL=product.service.d.ts.map