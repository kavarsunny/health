export declare const registerUser: (name: string, email: string, password: string) => Promise<{
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}>;
export declare const getUserProfile: (userId: string) => Promise<{
    _id: string;
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=auth.service.d.ts.map