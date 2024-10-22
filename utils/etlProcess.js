import Lead from '../models/Lead.js';
import Campaign from '../models/Campaign.js';

const fetchCRMData = () => {
  return [
    { name: 'John Doe', email: 'john@rem.com', phone: '123456789' },
    { name: 'steve Smith', email: 'jane@mera.com', phone: '987654321' },
  ];
};

const fetchMarketingData = () => {
  return [
    { name: 'Campaign A', budget: 1000, leadsGenerated: 50 },
    { name: 'Campaign B', budget: 2000, leadsGenerated: 100 },
  ];
};

// ETL Process
export const runETLProcess = async () => {
  try {
    const crmData = fetchCRMData();
    const marketingData = fetchMarketingData();

    const transformedLeads = crmData.map(lead => ({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
    }));

    const transformedCampaigns = marketingData.map(campaign => ({
      name: campaign.name,
      budget: campaign.budget,
      leadsGenerated: campaign.leadsGenerated,
    }));

    await Lead.insertMany(transformedLeads);
    await Campaign.insertMany(transformedCampaigns);

    console.log('ETL process completed successfully');
  } catch (error) {
    console.error('Error during ETL process:', error);
  }
};
