import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Article, Interview, Candidate } from "./models/dataModel.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/control-difuso";

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

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
    console.log("🔄 Intentando conectar a MongoDB...");
    console.log("📍 MONGO_URI:", mongoUri ? "✅ Configurada" : "❌ No configurada");
    
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB conectado exitosamente");

    // Artículo de prueba
    const articleCount = await Article.countDocuments();
    console.log(`📊 Artículos existentes: ${articleCount}`);
    
    if (articleCount === 0) {
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
    const interviewCount = await Interview.countDocuments();
    console.log(`📊 Entrevistas existentes: ${interviewCount}`);
    
    if (interviewCount === 0) {
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
    const candidateCount = await Candidate.countDocuments();
    console.log(`📊 Candidatos existentes: ${candidateCount}`);
    
    if (candidateCount === 0) {
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
    console.error("❌ Error MongoDB:", err.message);
    console.error("🔍 Detalles del error:", err);
  }
}

connectDB();

// Iniciar server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
