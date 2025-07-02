import express from 'express';
import cors from 'cors';
// import routes from './app/routes';
import { globalErrorHandler } from './middlewares/errorHandler';


const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api', routes);

app.use(globalErrorHandler);

export default app;
