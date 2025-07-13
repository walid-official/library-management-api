import { Request, Response } from 'express';
import { BorrowService } from '../services/borrow.service';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const result = await BorrowService.borrowBook(req.body);
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to borrow book',
      error: error.message,
    });
  }
};

export const getBorrowedSummary = async (req: Request, res: Response) => {
  try {
    const result = await BorrowService.getBorrowedBooksSummary();
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to get summary',
      error: error.message
    });
  }
};