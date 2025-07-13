import express from 'express';
import cors from 'cors';
// import routes from './app/routes';
import { globalErrorHandler } from './app/middlewares/errorHandler';
import { BookRoutes } from './app/routes/book.route';
import { BorrowRoutes } from './app/routes/borrow.route';


const app = express();

// app.use(cors());

app.use(express.json());

app.use('/api/books', BookRoutes);
app.use('/api/borrow', BorrowRoutes);

app.use(globalErrorHandler);

export default app;