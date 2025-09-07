import { Article, Interview, Candidate } from '../models/dataModel.js';

// ========== ARTICLE CONTROLLERS ==========

// Obtener todos los artículos
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos', error: error.message });
  }
};

// Obtener un artículo por ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículo', error: error.message });
  }
};

// Crear nuevo artículo
export const createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear artículo', error: error.message });
  }
};

// Actualizar artículo
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar artículo', error: error.message });
  }
};

// Eliminar artículo
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }
    res.json({ message: 'Artículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar artículo', error: error.message });
  }
};

// ========== INTERVIEW CONTROLLERS ==========

// Obtener todas las entrevistas
export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ date: -1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener entrevistas', error: error.message });
  }
};

// Obtener una entrevista por ID
export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Entrevista no encontrada' });
    }
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener entrevista', error: error.message });
  }
};

// Crear nueva entrevista
export const createInterview = async (req, res) => {
  try {
    const interview = new Interview(req.body);
    const savedInterview = await interview.save();
    res.status(201).json(savedInterview);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear entrevista', error: error.message });
  }
};

// Actualizar entrevista
export const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!interview) {
      return res.status(404).json({ message: 'Entrevista no encontrada' });
    }
    res.json(interview);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar entrevista', error: error.message });
  }
};

// Eliminar entrevista
export const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Entrevista no encontrada' });
    }
    res.json({ message: 'Entrevista eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar entrevista', error: error.message });
  }
};

// ========== CANDIDATE CONTROLLERS ==========

// Obtener todos los candidatos
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ name: 1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener candidatos', error: error.message });
  }
};

// Obtener un candidato por ID
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidato no encontrado' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener candidato', error: error.message });
  }
};

// Crear nuevo candidato
export const createCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear candidato', error: error.message });
  }
};

// Actualizar candidato
export const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!candidate) {
      return res.status(404).json({ message: 'Candidato no encontrado' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar candidato', error: error.message });
  }
};

// Eliminar candidato
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidato no encontrado' });
    }
    res.json({ message: 'Candidato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar candidato', error: error.message });
  }
};