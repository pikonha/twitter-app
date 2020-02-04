import express from "express";

const app = express();
const PORT = 3333;

app.get("/", (req, res) => {
  res.send("Hello GeekHunter!!");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
