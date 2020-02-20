const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");
const middlewares = require("./middlewares");

const app = express();

app.use(morgan("common"));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to the database!")
);

app.use(router);

// Middleware recurso não encontrado
app.use(middlewares.notFound);

// Middeware de tratamento de erro
app.use(middlewares.errorHandling);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
