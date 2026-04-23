"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.createCategory = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const ApiError_1 = require("../utils/ApiError");
const getAllCategories = async () => {
    return await Category_1.default.find().sort({ name: 1 });
};
exports.getAllCategories = getAllCategories;
const createCategory = async (name, description) => {
    const exists = await Category_1.default.findOne({ name });
    if (exists)
        throw new ApiError_1.ApiError(400, 'Category already exists');
    return await Category_1.default.create({ name, description });
};
exports.createCategory = createCategory;
const deleteCategory = async (id) => {
    const category = await Category_1.default.findByIdAndDelete(id);
    if (!category)
        throw new ApiError_1.ApiError(404, 'Category not found');
    return category;
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.service.js.map