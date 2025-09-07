import express from 'express';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview,
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate
} from '../controllers/dataController.js';

const router = express.Router();

// ========== ARTICLE ROUTES ==========
router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.post('/articles', createArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

// ========== INTERVIEW ROUTES ==========
router.get('/interviews', getInterviews);
router.get('/interviews/:id', getInterviewById);
router.post('/interviews', createInterview);
router.put('/interviews/:id', updateInterview);
router.delete('/interviews/:id', deleteInterview);

// ========== CANDIDATE ROUTES ==========
router.get('/candidates', getCandidates);
router.get('/candidates/:id', getCandidateById);
router.post('/candidates', createCandidate);
router.put('/candidates/:id', updateCandidate);
router.delete('/candidates/:id', deleteCandidate);

export default router;