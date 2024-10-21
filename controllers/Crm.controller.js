import Lead from '../models/Lead.js';
import { transformLeadData } from '../utils/etlProcess.js';

// Simulated fetching leads from a CRM platform
export const fetchLeads = async (req, res) => {
  try {
    const rawLeads = [
      { name: 'John Doe', email: 'john@example.com', status: 'NEW', source: 'Website' },
      { name: 'Jane Smith', email: 'jane@example.com', status: 'CONTACTED', source: 'Email' },
    ];

    const leads = transformLeadData(rawLeads);
    await Lead.insertMany(leads);

    res.status(200).json({ message: 'Leads stored successfully', data: leads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
