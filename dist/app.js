"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import routes from './app/routes';
const errorHandler_1 = require("./app/middlewares/errorHandler");
const book_route_1 = require("./app/routes/book.route");
const borrow_route_1 = require("./app/routes/borrow.route");
const routeNotFoundHandler_1 = __importDefault(require("./app/middlewares/routeNotFoundHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/books', book_route_1.BookRoutes);
app.use('/api/borrow', borrow_route_1.BorrowRoutes);
app.get("/", (req, res) => {
    res.send("Server connected successfully");
});
app.use(routeNotFoundHandler_1.default);
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
