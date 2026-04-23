export declare const registerUser: (name: string, email: string | undefined, phone: string | undefined, password?: string, city?: string, pincode?: string) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    name: string;
    email: string | undefined;
    phone: string | undefined;
    role: "customer" | "admin" | "farmer" | "superadmin";
    token: string;
}>;
export declare const registerFarmer: (data: any) => Promise<{
    user: {
        _id: import("mongoose").Types.ObjectId;
        name: string;
        phone: string | undefined;
        role: "customer" | "admin" | "farmer" | "superadmin";
    };
    profile: import("mongoose").Document<unknown, {}, import("../models/FarmerProfile").IFarmerProfile, {}, import("mongoose").DefaultSchemaOptions> & import("../models/FarmerProfile").IFarmerProfile & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    token: string;
}>;
export declare const loginUser: (emailOrPhone: string, password?: string) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    name: string;
    email: string | undefined;
    phone: string | undefined;
    role: "customer" | "admin" | "farmer" | "superadmin";
    token: string;
}>;
export declare const getUserProfile: (userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getAllUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getAllFarmers: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getPendingFarmers: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/FarmerProfile").IFarmerProfile, {}, import("mongoose").DefaultSchemaOptions> & import("../models/FarmerProfile").IFarmerProfile & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const approveFarmer: (profileId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/FarmerProfile").IFarmerProfile, {}, import("mongoose").DefaultSchemaOptions> & import("../models/FarmerProfile").IFarmerProfile & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateUserRole: (userId: string, role: "customer" | "admin" | "farmer" | "superadmin") => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteUser: (userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map