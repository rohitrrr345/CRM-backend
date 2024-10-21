import express from 'express';
import { generateReport } from '../controllers/report.contoller.js';
import { fetchCampaigns, fetchLeads } from '../controllers/Crm.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
import { login, register } from '../controllers/User.controller.js';

const router = express.Router();
router.post('/register',register);
router.post('/login',login);
router.get('/fetch-leads',isAuthenticated, fetchLeads);
router.get('/fetch-campaigns',isAuthenticated, fetchCampaigns);
router.get('/generate-report',isAuthenticated, generateReport);

export default router;
