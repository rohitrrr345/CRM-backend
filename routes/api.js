import express from 'express';
import { fetchLeads } from '../controllers/Crm.controller.js';
import { generateReport } from '../controllers/report.contoller.js';
import { fetchCampaigns } from '../controllers/Marketing.contoller.js';

const router = express.Router();

router.get('/fetch-leads', fetchLeads);
router.get('/fetch-campaigns', fetchCampaigns);
router.get('/generate-report', generateReport);

export default router;
