import { Request, Response } from 'express';
import { BorrowService } from '../services/borrow.service';
import { borrowZodSchema } from '../zodSchemas/borrow.zod';
import { z } from 'zod';

export const borrowBook = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Validate payload
    const parsed = borrowZodSchema.safeParse(req.body);

    if (!parsed.success) {
      const formatted = z.treeifyError(parsed.error);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatted,
      });
    }

    const result = await BorrowService.borrowBook(parsed.data);

    return res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: 'Failed to borrow book',
      error: error.message,
    });
  }
};

export const getBorrowedSummary = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await BorrowService.getBorrowedBooksSummary();
    return res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get summary',
      error: error.message,
    });
  }
};
