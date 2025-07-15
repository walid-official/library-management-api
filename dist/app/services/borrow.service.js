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
exports.BorrowService = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.BorrowService = {
    borrowBook(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { book, quantity, dueDate } = payload;
            const foundBook = yield book_model_1.Book.findById(book);
            if (!foundBook) {
                throw new Error('Book not found');
            }
            if (foundBook.copies < quantity) {
                throw new Error('Not enough copies available');
            }
            foundBook.copies -= quantity;
            if (foundBook.copies === 0) {
                foundBook.available = false;
            }
            yield foundBook.save();
            const borrow = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
            return borrow;
        });
    },
    getBorrowedBooksSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const summary = yield borrow_model_1.Borrow.aggregate([
                {
                    $group: {
                        _id: '$book',
                        totalQuantity: { $sum: '$quantity' }
                    }
                },
                {
                    $lookup: {
                        from: 'books',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'bookDetails'
                    }
                },
                {
                    $unwind: '$bookDetails'
                },
                {
                    $project: {
                        _id: 0,
                        book: {
                            title: '$bookDetails.title',
                            isbn: '$bookDetails.isbn'
                        },
                        totalQuantity: 1
                    }
                }
            ]);
            return summary;
        });
    }
};
