import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';
import { bookZodSchema } from '../zodSchemas/book.zod';
import { z } from 'zod';

export const BookController = {
  createBook: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const parsed = bookZodSchema.safeParse(req.body);

      if (!parsed.success) {
        const formatted = z.treeifyError(parsed.error);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: formatted,
        });
      }

      const book = await BookService.createBook(parsed.data);

      return res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: book,
      });
    } catch (err) {
      next(err);
    }
  },

  getBooks: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const books = await BookService.getBooks(req.query);

      return res.json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
      });
    } catch (err) {
      next(err);
    }
  },

  getBookById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const book = await BookService.getBookById(req.params.bookId);

      return res.json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
      });
    } catch (err) {
      next(err);
    }
  },

  updateBook: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const book = await BookService.updateBook(req.params.bookId, req.body);

      return res.json({
        success: true,
        message: 'Book updated successfully',
        data: book,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBook: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await BookService.deleteBook(req.params.bookId);

      return res.json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
