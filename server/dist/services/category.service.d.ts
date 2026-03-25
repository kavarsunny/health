export declare const getAllCategories: () => Promise<{
    _id: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
}[]>;
export declare const createCategory: (name: string, description: string) => Promise<{
    _id: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
}>;
export declare const deleteCategory: (id: string) => Promise<{
    _id: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
}>;
//# sourceMappingURL=category.service.d.ts.map