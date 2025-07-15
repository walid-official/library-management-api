"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const zodObjectId = zod_1.z.string().refine(mongoose_1.default.isValidObjectId, {
    message: 'Invalid book ID',
});
exports.borrowZodSchema = zod_1.z.object({
    book: zodObjectId,
    quantity: zod_1.z.number().int().min(1, 'Minimum 1 book required'),
    dueDate: zod_1.z.coerce.date().refine((date) => !isNaN(date.getTime()), {
        message: 'Invalid date',
    }),
});
