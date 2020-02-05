import express from "express";

const app = express();
const PORT = 3333;

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
