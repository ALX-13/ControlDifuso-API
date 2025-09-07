import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { Article, Interview, Candidate } from "./models/dataModel.js";
import apiRoutes from "./routes/api.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});
const mongoUri = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("API de Control Difuso funcionando 🚀");
});

// API Routes
app.use("/api", apiRoutes);

// WebSocket
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// 🔹 Conexión DB + insertar demo
async function connectDB() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log("✅ MongoDB conectado"))
    .catch((err) => console.error("❌ Error MongoDB:", err));

    // Artículo de prueba
    if (await Article.countDocuments() === 0) {
      await Article.create({
        title: "Primer artículo",
        excerpt: "Resumen breve del artículo",
        content: "Contenido de prueba",
        author: "Admin",
        section: "Tecnología"
      });
      console.log("📝 Artículo de prueba creado");
    }

    // Entrevista de prueba
    if (await Interview.countDocuments() === 0) {
      await Interview.create({
        title: "Entrevista inicial",
        interviewer: "Control Difuso",
        interviewee: "Candidato X",
        transcript: "Resumen de la entrevista de prueba",
        videoUrl: ""
      });
      console.log("🎤 Entrevista de prueba creada");
    }

    // Candidato de prueba
    if (await Candidate.countDocuments() === 0) {
      await Candidate.create({
        name: "Candidato de prueba",
        party: "Partido Demo",
        bio: "Este es un candidato de ejemplo para pruebas.",
        photoUrl: "",
        proposals: ["Educación gratuita", "Salud universal"]
      });
      console.log("👤 Candidato de prueba creado");
    }

  } catch (err) {
    console.error("❌ Error MongoDB:", err);
  }
}

connectDB();

// Iniciar server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
