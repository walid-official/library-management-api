import express from 'express';
// import routes from './app/routes';
import { globalErrorHandler } from './app/middlewares/errorHandler';
import { BookRoutes } from './app/routes/book.route';
import { BorrowRoutes } from './app/routes/borrow.route';
import routeNotFoundHandler from './app/middlewares/routeNotFoundHandler';


const app = express();

app.use(express.json());

app.use('/api/books', BookRoutes);
app.use('/api/borrow', BorrowRoutes);


app.use(routeNotFoundHandler);

app.use(globalErrorHandler);

export default app;