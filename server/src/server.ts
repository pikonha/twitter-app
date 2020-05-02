import express from 'express';
import morgan from 'morgan';

import routes from './routes';
import './database';

const app = express();

app.use(morgan('common'));
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
