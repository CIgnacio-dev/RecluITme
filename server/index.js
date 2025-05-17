import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use("/api/auth", authRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("API RecluitMe funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


