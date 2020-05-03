import { Router } from 'express';

import TweetRoutes from './tweets.routes';
import UsersRoutes from './users.routes';

const router = Router();

router.use('/tweets', TweetRoutes);
router.use('/users', UsersRoutes);

// Middleware recurso não encontrado
router.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Middeware de tratamento de erro
router.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = statusCode;
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🤓' : error.stack,
  });
});

export default router;

// // Login
// router.post("/login", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;

//     // Verificar se username é valido
//     const user = await User.findOne({ username });

//     if (!user) return res.status(404).send({ error: "Username not found." });

//     console.log(user);

//     // Verifica se a senha é válida
//     const validPassword = await bcrypt.compare(password, user.password);

//     if (!validPassword) return res.status(400).send("Invalid password.");

//     // Criar token de validação de usuário
//     const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
//     res.header("auth-token", token).send({ token });
//   } catch (error) {
//     res.status(400);
//     next(error);
//   }
// });
