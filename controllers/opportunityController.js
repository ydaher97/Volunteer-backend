const { Opportunity } = require('../models/opportunity');
const {Organization } = require('../models/organization')


const opportunityController = {
  // Create a new opportunity
  createOpportunity: async (req, res) => {
    try {
      console.log(req.body)
      const { title, description, organization, startDate, endDate, place,category, lat, long } = req.body;
      const opportunity = new Opportunity({
        title,
        description,
        organization,
        place,
        category,
        startDate,
        endDate,
        location: {
          coordinates: [long, lat] 
        }
      });
      await opportunity.save();

      await Organization.findByIdAndUpdate(
        organization,
        { $push: { opportunities: opportunity._id } },
        { new: true }
      );
      res.status(201).json({ message: 'Opportunity created successfully', opportunity });
    } catch (error) {
      res.status(500).json({ error: 'Unable to create opportunity', message: error.message });
    }
  },

  // Get all opportunities
  getAllOpportunities: async (req, res) => {
    try {
      const opportunities = await Opportunity.find();
      res.status(200).json({ opportunities });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch opportunities', message: error.message });
    }
  },

  // Get opportunity by ID
  getOpportunityById: async (req, res) => {
    try {
      const opportunity = await Opportunity.findById(req.params.id);
      if (!opportunity) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }
      res.status(200).json({ opportunity });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch opportunity', message: error.message });
    }
  },

  // Update opportunity by ID
  updateOpportunity: async (req, res) => {
    try {
      const { title, description, organization, userId } = req.body;
      const updatedOpportunity = await Opportunity.findByIdAndUpdate(
        req.params.id,
        { $set: { title, description, organization }, $push: { volunteers: userId } },
        { new: true }
      );
        console.log(updatedOpportunity)
      if (!updatedOpportunity) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }
  
      res.status(200).json({ message: 'Opportunity updated successfully', opportunity: updatedOpportunity });
    } catch (error) {
      res.status(500).json({ error: 'Unable to update opportunity', message: error.message });
    }
  },

  // Delete opportunity by ID
  deleteOpportunity: async (req, res) => {
    try {
      const deletedOpportunity = await Opportunity.findByIdAndDelete(req.params.id);
      if (!deletedOpportunity) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }
      res.status(200).json({ message: 'Opportunity deleted successfully', opportunity: deletedOpportunity });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete opportunity', message: error.message });
    }
  }
};

module.exports = opportunityController;
