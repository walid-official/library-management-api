import express from 'express';
import { BookController } from '../controllers/book.controller';

const router = express.Router();

router.post('/', BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:bookId', BookController.getBookById);
router.put('/:bookId', BookController.updateBook);
router.delete('/:bookId', BookController.deleteBook);

export const BookRoutes = router;