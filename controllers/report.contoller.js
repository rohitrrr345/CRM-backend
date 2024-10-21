import Lead from '../models/Lead.js';
import Campaign from '../models/Campaign.js';
import { sendAlert } from '../services/Notification.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';

// Helper function to generate PDF
const generatePDFReport = (reportData, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(16).text('EzyMetrics Report', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Total Leads: ${reportData.totalLeads}`);
  doc.text(`Total Campaigns: ${reportData.totalCampaigns}`);
  doc.moveDown();

  doc.text('Lead Details:');
  reportData.leads.forEach(lead => {
    doc.text(`Name: ${lead.name}, Email: ${lead.email}, Phone: ${lead.phone}`);
  });

  doc.moveDown();
  doc.text('Campaign Details:');
  reportData.campaigns.forEach(campaign => {
    doc.text(`Name: ${campaign.name}, Platform: ${campaign.platform}, Clicks: ${campaign.clicks}, Impressions: ${campaign.impressions}`);
  });

  doc.end();
};

export const generateReport = async (req, res) => {
  try {
    const leads = await Lead.find({});
    const campaigns = await Campaign.find({});
    
    const report = {
      totalLeads: leads.length,
      totalCampaigns: campaigns.length,
      leads: leads.map(lead => ({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
      })),
      campaigns: campaigns.map(campaign => ({
        name: campaign.name,
        platform: campaign.platform,
        clicks: campaign.clicks,
        impressions: campaign.impressions,      })),
    };

    const filePath = `./reports/ezymetrics-report.pdf`;

    // Generate the PDF report
    generatePDFReport(report, filePath);

    if (leads.length >8) {
      await sendAlert('Too many leads in the system You have to check it now for further cases!');
    }

    res.status(200).json({ message: `PDF Report generated`, reportPath: filePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
