import express from "express";
import dotenv from "dotenv";
import Axios from "axios";

const app = express();
const PORT = 3333;

dotenv.config();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const r = await Axios.get("http://localhost:3000/tweets")
    res.send(r.data)
  } catch (error) {
    res.status(400).send(error)
  }
  // res.send(" uaehgeaihueaihu ")  
});


// Login
app.post("/login", (req, res) => {
  // Response
});

// Criar usuário
app.post("/users", (req, res) => {
  // Response
});

// Encontrar usuário
app.get("/users/:id", (req, res) => {
  // Response
});

// Encontrar tweets do usuário
app.get("/users/:id/tweets", (req, res) => {
  // Response
});

// Encontrar tweet específico do usuário
app.get("/users/:id/tweets/:id", (req, res) => {
  // Response
});

// Criar tweets
app.post("/tweets", (req, res) => {
  // Response
});

// Encontrar todos os tweets
app.get("/tweets", (req, res) => {
  // Response
});

// Encontrar tweet específico
app.get("/tweets/:id", (req, res) => {
  // Response
});

// Deletar tweet específico
app.delete("/tweets/:id", (req, res) => {
  // Response
});

// Atualizar tweet específico (like/unlike)
app.put("/tweets/:id", (req, res) => {
  // Response
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
