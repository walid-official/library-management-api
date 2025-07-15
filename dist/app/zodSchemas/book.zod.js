"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookZodSchema = exports.GenreEnum = void 0;
const zod_1 = require("zod");
exports.GenreEnum = zod_1.z.enum([
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
]);
exports.bookZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    author: zod_1.z.string().min(1, 'Author is required'),
    genre: exports.GenreEnum,
    isbn: zod_1.z.string().min(1, 'ISBN is required'),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().min(0, 'Copies must be 0 or more'),
    available: zod_1.z.boolean().optional(),
});
