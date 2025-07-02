import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';

export const BookController = {
  createBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await BookService.createBook(req.body);
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: book,
      });
    } catch (err) {
      next(err);
    }
  },

  getBooks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await BookService.getBooks(req.query);
      res.json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
      });
    } catch (err) {
      next(err);
    }
  },

  getBookById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await BookService.getBookById(req.params.bookId);
      res.json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
      });
    } catch (err) {
      next(err);
    }
  },

  updateBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await BookService.updateBook(req.params.bookId, req.body);
      res.json({
        success: true,
        message: 'Book updated successfully',
        data: book,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await BookService.deleteBook(req.params.bookId);
      res.json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
