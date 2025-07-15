import { z } from 'zod';

export const GenreEnum = z.enum([
  'FICTION',
  'NON_FICTION',
  'SCIENCE',
  'HISTORY',
  'BIOGRAPHY',
  'FANTASY',
]);

export const bookZodSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: GenreEnum,
  isbn: z.string().min(1, 'ISBN is required'),
  description: z.string().optional(),
  copies: z.number().min(0, 'Copies must be 0 or more'),
  available: z.boolean().optional(), 
});
