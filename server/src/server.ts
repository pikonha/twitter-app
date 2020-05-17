import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import 'express-async-errors';

import './database';
import uploadConfig from './config/upload';
import routes from './routes';
import { ErrorHandler, NotFound } from './middlewares';

const app = express();

app.use(morgan('common'));
app.use(express.json());

app.use(routes);
app.use('/files', express.static(uploadConfig.destination));
app.use(NotFound);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
