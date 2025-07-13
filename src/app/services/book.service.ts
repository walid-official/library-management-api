import { Book } from "../models/book.model";

export const BookService = {
  createBook: async (data: any) => {
    const newBook = await Book.create(data);
    return newBook;
  },

  getBooks: async (query: any) => {
    const filter = query.filter ? { genre: query.filter } : {};
    const sort = query.sort === 'asc' ? 1 : -1;
    const sortBy = query.sortBy || 'createdAt';
    const limit = parseInt(query.limit) || 10;

    const books = await Book.find(filter).sort({ [sortBy]: sort }).limit(limit);
    return books;
  },

  getBookById: async (id: string) => {
    return await Book.findById(id);
  },

  updateBook: async (id: string, data: any) => {
    const book = await Book.findByIdAndUpdate(id, data, { new: true });
    return book;
  },

  deleteBook: async (id: string) => {
    return await Book.findByIdAndDelete(id);
  },
};