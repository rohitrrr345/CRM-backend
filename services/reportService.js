import PDFDocument from 'pdfkit';

export const generatePDFReport = async (report, leads = [], campaigns = []) => {
  const doc = new PDFDocument();

  doc.fontSize(20).text('EzyMetrics Report', { align: 'center' });
  doc.moveDown();

  doc.fontSize(14).text(`Total Leads: ${report.totalLeads}`);
  doc.text(`Total Campaigns: ${report.totalCampaigns}`);
  doc.moveDown();

  // Add a timestamp for when the report is generated
  doc.text('Generated at: ' + new Date().toLocaleString());
  doc.moveDown();

  // Section for Lead details
  doc.fontSize(16).text('Lead Information:', { underline: true });
  leads.forEach((lead, index) => {
    doc.fontSize(12).text(`${index + 1}. Name: ${lead.name}`);
    doc.text(`   Email: ${lead.email}`);
    doc.text(`   Phone: ${lead.phone}`);
    doc.text(`   Created At: ${new Date(lead.createdAt).toLocaleString()}`);
    doc.moveDown();
  });

  // Section for Campaign details
  doc.fontSize(16).text('Campaign Information:', { underline: true });
  campaigns.forEach((campaign, index) => {
    doc.fontSize(12).text(`${index + 1}. Name: ${campaign.name}`);
    doc.text(`   Budget: ${campaign.budget}`);
    doc.text(`   Leads Generated: ${campaign.leadsGenerated}`);
    doc.text(`   Created At: ${new Date(campaign.createdAt).toLocaleString()}`);
    doc.moveDown();
  });

  // Finalize the document and end the stream
  doc.end();

  return doc;
};
