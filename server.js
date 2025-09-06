import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // tu Angular corre en el 4200
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("API de Control Difuso funcionando 🚀");
});

// WebSocket
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// DB (Mongo)
mongoose
  .connect("mongodb://localhost:27017/control-difuso")
  .then(() => console.log("MongoDB conectado ✅"))
  .catch((err) => console.error("Error MongoDB ❌:", err));

// Iniciar server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
