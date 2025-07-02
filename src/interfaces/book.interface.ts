import { Document, Types } from 'mongoose';
import { Genre } from '../models/book.model';

// 1. Main Book Interface
export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

// 2. Instance Method Type
export interface BookDocument extends IBook, Document {
  updateAvailability: () => void;
}
