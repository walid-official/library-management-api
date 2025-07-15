"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("../services/book.service");
const book_zod_1 = require("../zodSchemas/book.zod");
const zod_1 = require("zod");
exports.BookController = {
    createBook: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parsed = book_zod_1.bookZodSchema.safeParse(req.body);
            if (!parsed.success) {
                const formatted = zod_1.z.treeifyError(parsed.error);
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: formatted,
                });
            }
            const book = yield book_service_1.BookService.createBook(parsed.data);
            return res.status(201).json({
                success: true,
                message: 'Book created successfully',
                data: book,
            });
        }
        catch (err) {
            next(err);
        }
    }),
    getBooks: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const books = yield book_service_1.BookService.getBooks(req.query);
            return res.json({
                success: true,
                message: 'Books retrieved successfully',
                data: books,
            });
        }
        catch (err) {
            next(err);
        }
    }),
    getBookById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield book_service_1.BookService.getBookById(req.params.bookId);
            return res.json({
                success: true,
                message: 'Book retrieved successfully',
                data: book,
            });
        }
        catch (err) {
            next(err);
        }
    }),
    updateBook: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield book_service_1.BookService.updateBook(req.params.bookId, req.body);
            return res.json({
                success: true,
                message: 'Book updated successfully',
                data: book,
            });
        }
        catch (err) {
            next(err);
        }
    }),
    deleteBook: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield book_service_1.BookService.deleteBook(req.params.bookId);
            return res.json({
                success: true,
                message: 'Book deleted successfully',
                data: null,
            });
        }
        catch (err) {
            next(err);
        }
    }),
};
