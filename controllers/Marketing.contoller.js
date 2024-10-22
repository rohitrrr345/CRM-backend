import Campaign from '../models/Campaign.js';
import { transformCampaignData } from '../utils/etlProcess.js';

export const fetchCampaigns = async (req, res) => {
  try {
    const rawCampaigns = [
      { name: 'Summer Campaign', platform: 'Google', clicks: 100, impressions: 500 },
      { name: 'Winter Campaign', platform: 'Facebook', clicks: 50, impressions: 300 },
    ];

    const campaigns = transformCampaignData(rawCampaigns);
    await Campaign.insertMany(campaigns);

    res.status(200).json({ message: 'Campaigns stored successfully', data: campaigns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
