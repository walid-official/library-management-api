import mongoose, { Schema, Model } from 'mongoose';
import { BookDocument } from '../interfaces/book.interface';

export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY',
}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: Object.values(Genre), required: true, uppercase: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

//  Instance Method
bookSchema.methods.updateAvailability = function (): boolean {
  if (this.copies > 0) {
    this.available = true;
  } else {
    this.available = false;
  }
  return this.available;
};


bookSchema.pre('save', function (next) {
  this.updateAvailability();
  console.log('[PRE] Updating availability before saving...');
  next();
});


bookSchema.post('save', function (doc) {
  console.log(`[POST] Book "${doc.title}" saved successfully.`);
});

export const Book: Model<BookDocument> = mongoose.model<BookDocument>('Book', bookSchema);