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
exports.BookService = void 0;
const book_model_1 = require("../models/book.model");
exports.BookService = {
    createBook: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const newBook = yield book_model_1.Book.create(data);
        return newBook;
    }),
    getBooks: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const filter = query.filter ? { genre: query.filter } : {};
        const sort = query.sort === 'asc' ? 1 : -1;
        const sortBy = query.sortBy || 'createdAt';
        const limit = parseInt(query.limit) || 10;
        const books = yield book_model_1.Book.find(filter).sort({ [sortBy]: sort }).limit(limit);
        return books;
    }),
    getBookById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield book_model_1.Book.findById(id);
    }),
    updateBook: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findByIdAndUpdate(id, data, { new: true });
        return book;
    }),
    deleteBook: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield book_model_1.Book.findByIdAndDelete(id);
    }),
};
