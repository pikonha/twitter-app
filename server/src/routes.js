const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticate = require("./auth");
const User = require("../model/User");
const Tweet = require("../model/Tweet");

const router = new Router();

// Criar usuário
router.post("/register", async (req, res, next) => {
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
    res.status(400);
    next(error);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Verificar se username é valido
    const user = await User.findOne({ username });

    if (!user) return res.status(404).send({ error: "Username not found." });

    console.log(user);

    // Verifica se a senha é válida
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).send("Invalid password.");

    // Criar token de validação de usuário
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    res.header("auth-token", token).send({ token });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// Encontrar usuários
router.get("/users", authenticate, async (req, res, next) => {
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
    res.status(400);
    next(err);
  }
});

// Encontrar usuário
router.get("/users/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(400).send({ error: "User not found." });

    res.status(200).send({
      id: user._id,
      username: user.username
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

// Criar tweets
router.post("/tweets", authenticate, async (req, res, next) => {
  const { content } = req.body;

  const tweet = await Tweet.create({ owner: req.user._id, content });

  if (!tweet) res.status(400).send({ error: "Unable to create tweet." });

  res.status(201).send({
    id: tweet._id,
    owner: tweet.owner,
    content: tweet.content,
    likes: tweet.likes
  });
});

// Deletar tweet específico
router.delete("/tweets/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  try {
    await Tweet.deleteOne({ _id: id });
    res.status(200).send({ message: "Tweet deleted." });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

// Atualizar tweet específico (like/unlike)
router.put("/tweets/:id", authenticate, async (req, res, next) => {
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

    res.status(200).send(tweet);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

// Encontrar tweets do usuário
router.get("/users/:id/tweets", authenticate, async (req, res, next) => {
  const { id } = req.params;

  try {
    const tweets = await Tweet.find({ owner: id });

    res.status(200).send(tweets);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

// Encontrar todos os tweets
router.get("/tweets", authenticate, async (req, res, next) => {
  try {
    const tweets = await Tweet.find({});

    res.status(200).send(tweets);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

// Encontrar tweet específico
router.get("/tweets/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findById(id);

    if (!tweet) return res.status(400).send({ error: "Tweet not found." });

    res.status(200).send(tweet);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
