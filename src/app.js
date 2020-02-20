const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticate = require("./auth");
const User = require("../model/User");
const Tweet = require("../model/Tweet");

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to the database!")
);

// Criar usuário
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar se username é valido
    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(400).send({ error: "Username already in use." });

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //Criar novo usuário no banco
    const user = await User.create({
      username,
      password: hash
    });

    res.status(201).send({
      id: user.id,
      username: user.username
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar se username é valido
    const user = await User.findOne({ username });

    if (!user) return res.status(400).send({ error: "Username not found." });

    // Verifica se a senha é válida
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).send("Invalid password.");

    // Criar token de validação de usuário
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    res.header("auth-token", token).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.use(authenticate);

// Encontrar usuários
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    if (!users.length)
      return res.status(400).send({ error: "Unable to get users." });

    res.status(200).send(
      users.map(user => ({
        _id: user.id,
        username: user.username
      }))
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

// Encontrar usuário
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(400).send({ error: "User not found." });

    res.status(200).send({
      id: user._id,
      username: user.username
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Criar tweets
app.post("/tweets", async (req, res) => {
  const { content } = req.body;

  try {
    const tweet = await Tweet.create({ owner: req.user._id, content });

    if (!tweet) res.status(400).send({ error: "Unable to create tweet." });

    res.status(201).send({
      id: tweet._id,
      owner: tweet.owner,
      content: tweet.content,
      likes: tweet.likes
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Deletar tweet específico
app.delete("/tweets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Tweet.deleteOne({ _id: id });
    res.status(200).send({ message: "Tweet deleted." });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Atualizar tweet específico (like/unlike)
app.put("/tweets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findById(id);

    if (!tweet) return res.status(400).send({ error: "Tweet not found." });

    if (tweet.owner === req.user._id)
      return res.status(400).send({ error: "Unable to update tweet." });

    const tweetAlreadyLiked = tweet.likes.some(like => like == req.user._id);

    if (tweetAlreadyLiked) {
      tweet.likes = tweet.likes.filter(like => like != req.user._id);
    } else {
      tweet.likes.push(req.user._id);
    }

    tweet.save();

    res.status(200).send({
      id: tweet._id,
      owner: tweet.owner,
      content: tweet.content,
      likes: tweet.likes,
      date: tweet.date
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Encontrar tweets do usuário
app.get("/users/:id/tweets", async (req, res) => {
  const { id } = req.params;

  try {
    const tweets = await Tweet.find({ owner: id });

    const formattedTweets = tweets.map(tweet => ({
      id: tweet._id,
      owner: tweet.owner,
      content: tweet.content,
      likes: tweet.likes,
      date: tweet.date
    }));

    res.status(200).send(formattedTweets);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Encontrar todos os tweets
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({});

    const formattedTweets = tweets.map(tweet => ({
      id: tweet._id,
      owner: tweet.owner,
      content: tweet.content,
      likes: tweet.likes,
      date: tweet.date
    }));

    res.status(200).send(formattedTweets);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Encontrar tweet específico
app.get("/tweets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findById(id);

    if (!tweet) return res.status(400).send({ error: "Tweet not found." });

    res.status(200).send({
      id: tweet._id,
      owner: tweet.owner,
      content: tweet.content,
      likes: tweet.likes,
      date: tweet.date
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Middleware recurso não encontrado
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Middeware de tratamento de erro
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = statusCode;
  res.json({
    message: error.message,
    trace: error.trace
  });
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
