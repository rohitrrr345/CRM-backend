import Lead from '../models/Lead.js';
import Campaign from '../models/Campaign.js';

const dummyLeads = [
  { name: 'Viraj', email: 'Viraj@example.com', phone: '1234567890', status: 'NEW' },
  { name: 'Adamson', email: 'same@example.com', phone: '0987654321', status: 'CONTACTED' },
  { name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '5678901234', status: 'CONVERTED' },
];

const dummyCampaigns = [
  { name: 'Summer Campaign', platform: 'Google Ads', clicks: 120, impressions: 5000 },
  { name: 'Winter Campaign', platform: 'Facebook Ads', clicks: 80, impressions: 3000 },
];

export const fetchLeads = async (req, res) => {
  try {
    const leads = dummyLeads;

    await Lead.insertMany(leads);

    res.status(200).json({ message: 'Leads stored successfully', data: leads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchCampaigns = async (req, res) => {
  try {
    const campaigns = dummyCampaigns;

    await Campaign.insertMany(campaigns);

    res.status(200).json({ message: 'Campaigns stored successfully', data: campaigns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
