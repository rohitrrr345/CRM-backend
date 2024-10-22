import Lead from '../models/Lead.js';
import Campaign from '../models/Campaign.js';
import { runETLProcess } from '../utils/etlProcess.js';
import { sendAlert } from '../services/Notification.js';
import { generatePDFReport } from '../services/ReportService.js';

export const generateReport = async (req, res) => {
  try {
    await runETLProcess();

    const leads = await Lead.find({}) || []; 
    const campaigns = await Campaign.find({}) || [];  

    
    const report = {
      totalLeads: leads.length,
      totalCampaigns: campaigns.length,
    };

    
    if (leads.length > 50) {
      await sendAlert('Too many leads in the system!');
    }

    const pdf = await generatePDFReport(report, leads, campaigns);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
    });
    pdf.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
