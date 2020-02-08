const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

mongoose.connect(
  process.env.DB_URL, 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to the database!"))

app.get("/", (req, res) => {
  res.send("Hello GeekHunter! 🤓")
})

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});






// // const dotenv = require("dotenv");
// // const axios = require("axios");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // const app = express();
// // const PORT = 3333;

// // app.use(express.json());

// // dotenv.config();


// // // Criar usuário
// // app.post("/register", async (req, res) => {
// //   try {
// //     const { username, password } = req.body;

// //     // Verificar se username é valido
// //     let user = await axios.get(`${process.env.DB_URL}/users?username=${username}`)
    
// //     if (user.data.length > 0) return res.status(400).send("Username already in use.");

// //     // Criptografar a senha
// //     const salt = await bcrypt.genSalt(10);
// //     const hash = await bcrypt.hash(password, salt);

// //     // Criar usuário no banco
// //     user = await axios.post(`${process.env.DB_URL}/users`, {
// //       username, 
// //       password: hash
// //     })

// //     res.status(201).send({
// //       id: user.data.id,
// //       username: user.data.username
//     });

//   } catch (error) {    
//     res.status(400).send(error);
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Verificar se username é valido
//     const response = await axios.get(`${process.env.DB_URL}/users?username=${username}`)
  
//     if (response.data.length === 0) return res.status(400).send("Username not found.");

//     const user = response.data[0];

//     // Verifica se a senha é válida
//     const validPassword = await bcrypt.compare(password, user.password);
    
//     if (!validPassword) return res.status(400).send("Invalid password.");

//     // Criar token de validação de usuário
//     const token = jwt.sign({_id: user.id}, process.env.JWT_TOKEN);    
//     res.header('auth-token', token).send(token);

//   } catch (error) {  
//     console.error(error);
      
//     res.status(400).send(error);
//   }
// });

// // Encontrar usuário
// app.get("/users/:id", (req, res) => {
//   // Response
// });

// // Encontrar tweets do usuário
// app.get("/users/:id/tweets", (req, res) => {
//   // Response
// });

// // Encontrar tweet específico do usuário
// app.get("/users/:id/tweets/:id", (req, res) => {
//   // Response
// });

// // Criar tweets
// app.post("/tweets", (req, res) => {
//   // Response
// });

// // Encontrar todos os tweets
// app.get("/tweets", (req, res) => {
  
// });

// // Encontrar tweet específico
// app.get("/tweets/:id", (req, res) => {
//   // Response
// });

// // Deletar tweet específico
// app.delete("/tweets/:id", (req, res) => {
//   // Response
// });

// // Atualizar tweet específico (like/unlike)
// app.put("/tweets/:id", (req, res) => {
//   // Response
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port: ${PORT}`);
// });
