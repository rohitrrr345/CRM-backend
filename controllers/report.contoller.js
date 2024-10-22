import Lead from '../models/Lead.js';
import Campaign from '../models/Campaign.js';
import { runETLProcess } from '../utils/etlProcess.js';
import { sendAlert } from '../services/Notification.js';
import { generatePDFReport } from '../services/ReportService.js';

export const generateReport = async (req, res) => {
  try {
    // Step 1: Run the ETL process to extract, transform, and load data
    await runETLProcess();

    // Step 2: Query the transformed data (leads and campaigns) from MongoDB
    const leads = await Lead.find({}) || [];  // Fallback to an empty array if undefined
    const campaigns = await Campaign.find({}) || [];  // Fallback to an empty array if undefined

    // Step 3: Generate metrics and include conditions for sending alerts
    const report = {
      totalLeads: leads.length,
      totalCampaigns: campaigns.length,
    };

    // Step 4: Send alert if there are too many leads
    if (leads.length > 50) {
      await sendAlert('Too many leads in the system!');
    }

    // Step 5: Generate PDF Report, including all leads and campaign information
    const pdf = await generatePDFReport(report, leads, campaigns);

    // Step 6: Send the PDF report to the user
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
    });
    pdf.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
