export declare const getAllCategories: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const createCategory: (name: string, description: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteCategory: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
//# sourceMappingURL=category.service.d.ts.map