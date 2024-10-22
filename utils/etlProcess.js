import Lead from '../models/Lead.js';
import Campaign from '../models/Campaign.js';

// Simulate external CRM and marketing data
const fetchCRMData = () => {
  return [
    { name: 'John Doe', email: 'john@example.com', phone: '123456789' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987654321' },
    // Add more dummy leads
  ];
};

const fetchMarketingData = () => {
  return [
    { name: 'Campaign A', budget: 1000, leadsGenerated: 50 },
    { name: 'Campaign B', budget: 2000, leadsGenerated: 100 },
    // Add more dummy campaigns
  ];
};

// ETL Process
export const runETLProcess = async () => {
  try {
    // 1. Extract: Fetch data from CRM and marketing (dummy data in this case)
    const crmData = fetchCRMData();
    const marketingData = fetchMarketingData();

    // 2. Transform: Any transformation of the data can happen here
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

    // 3. Load: Insert into MongoDB (Leads and Campaigns)
    await Lead.insertMany(transformedLeads);
    await Campaign.insertMany(transformedCampaigns);

    console.log('ETL process completed successfully');
  } catch (error) {
    console.error('Error during ETL process:', error);
  }
};
