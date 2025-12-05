import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { db } from "./database.js";

const swaggerDocument = JSON.parse(readFileSync("./swagger.json", "utf8"));

dotenv.config();

const app = express();
app.use(express.json());

// Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Teste básico
app.get("/", (req, res) => {
  res.json({ message: "API rodando com sucesso!" });
});

// Teste DB
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API rodando na porta ${port}`));
