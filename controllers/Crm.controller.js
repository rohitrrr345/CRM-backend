import Lead from '../models/Lead.js';
import Campaign from '../models/Campaign.js';

// Simulated dummy leads and campaigns data
const dummyLeads = [
  { name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', status: 'NEW' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0987654321', status: 'CONTACTED' },
  { name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '5678901234', status: 'CONVERTED' },
];

const dummyCampaigns = [
  { name: 'Summer Campaign', platform: 'Google Ads', clicks: 120, impressions: 5000 },
  { name: 'Winter Campaign', platform: 'Facebook Ads', clicks: 80, impressions: 3000 },
];

// Controller to simulate fetching leads and store them
export const fetchLeads = async (req, res) => {
  try {
    // Simulate fetching from CRM
    const leads = dummyLeads;

    // Store the leads in the database
    await Lead.insertMany(leads);

    res.status(200).json({ message: 'Leads stored successfully', data: leads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to simulate fetching campaigns and store them
export const fetchCampaigns = async (req, res) => {
  try {
    // Simulate fetching from CRM
    const campaigns = dummyCampaigns;

    // Store the campaigns in the database
    await Campaign.insertMany(campaigns);

    res.status(200).json({ message: 'Campaigns stored successfully', data: campaigns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
