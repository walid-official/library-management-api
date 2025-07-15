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
exports.getBorrowedSummary = exports.borrowBook = void 0;
const borrow_service_1 = require("../services/borrow.service");
const borrow_zod_1 = require("../zodSchemas/borrow.zod");
const zod_1 = require("zod");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Validate payload
        const parsed = borrow_zod_1.borrowZodSchema.safeParse(req.body);
        if (!parsed.success) {
            const formatted = zod_1.z.treeifyError(parsed.error);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: formatted,
            });
        }
        const result = yield borrow_service_1.BorrowService.borrowBook(parsed.data);
        return res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to borrow book',
            error: error.message,
        });
    }
});
exports.borrowBook = borrowBook;
const getBorrowedSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_service_1.BorrowService.getBorrowedBooksSummary();
        return res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get summary',
            error: error.message,
        });
    }
});
exports.getBorrowedSummary = getBorrowedSummary;
