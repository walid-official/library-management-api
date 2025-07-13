import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";


export const BorrowService = {
  async borrowBook(payload: IBorrow) {
    const { book, quantity, dueDate } = payload;

    const foundBook = await Book.findById(book);
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

    await foundBook.save();

    const borrow = await Borrow.create({ book, quantity, dueDate });
    return borrow;
  },

   async getBorrowedBooksSummary() {
    const summary = await Borrow.aggregate([
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
  }
};