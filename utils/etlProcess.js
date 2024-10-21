export const transformLeadData = (rawLeads) => {
    return rawLeads.map(lead => ({
      ...lead,
      status: lead.status.toLowerCase(),
    }));
  };
  
  export const transformCampaignData = (rawCampaigns) => {
    return rawCampaigns.map(campaign => ({
      ...campaign,
      clickThroughRate: campaign.clicks / campaign.impressions,
    }));
  };
  