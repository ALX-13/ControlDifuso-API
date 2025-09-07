import mongoose from 'mongoose';

// Articles Schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  imageUrl: { type: String, trim: true },
  videoUrl: { type: String, trim: true },
  section: { type: String, required: true, enum: ['Tecnología', 'Política', 'Entrevista'], trim: true },
  date: { type: Date, default: Date.now },
  author: { type: String, required: true, trim: true },
  featured: { type: Boolean, default: false },
  tags: [{ type: String, trim: true }]
}, { timestamps: true });

// Interview Schema
const interviewSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  interviewer: { type: String, required: true, trim: true },
  interviewee: { type: String, required: true, trim: true },
  transcript: { type: String, required: true },
  videoUrl: { type: String, trim: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

// Candidate Schema
const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  party: { type: String, required: true, trim: true },
  bio: { type: String, required: true },
  photoUrl: { type: String, trim: true },
  proposals: [{ type: String, trim: true }]
}, { timestamps: true });

// Models
const Article = mongoose.model('Article', articleSchema);
const Interview = mongoose.model('Interview', interviewSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);

export { Article, Interview, Candidate };
