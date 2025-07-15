import { z } from 'zod';
import mongoose from 'mongoose';


const zodObjectId = z.string().refine(mongoose.isValidObjectId, {
  message: 'Invalid book ID',
});


export const borrowZodSchema = z.object({
  book: zodObjectId,
  quantity: z.number().int().min(1, 'Minimum 1 book required'),
  dueDate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: 'Invalid date',
  }),
});