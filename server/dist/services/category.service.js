"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.createCategory = exports.getAllCategories = void 0;
const db_1 = __importDefault(require("../config/db"));
const ApiError_1 = require("../utils/ApiError");
const getAllCategories = async () => {
    const categories = await db_1.default.category.findMany({
        orderBy: { name: 'asc' },
    });
    return categories.map(c => ({ ...c, _id: c.id }));
};
exports.getAllCategories = getAllCategories;
const createCategory = async (name, description) => {
    const exists = await db_1.default.category.findUnique({ where: { name } });
    if (exists)
        throw new ApiError_1.ApiError(400, 'Category already exists');
    const cat = await db_1.default.category.create({ data: { name, description } });
    return { ...cat, _id: cat.id };
};
exports.createCategory = createCategory;
const deleteCategory = async (id) => {
    try {
        const category = await db_1.default.category.delete({ where: { id } });
        return { ...category, _id: category.id };
    }
    catch (error) {
        throw new ApiError_1.ApiError(404, 'Category not found');
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.service.js.map