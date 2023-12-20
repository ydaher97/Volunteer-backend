const { Organization } = require('../models/organization');
const {User} = require('../models/user')

const organizationController = {
  // Create a new organization
  
  createOrganization: async (req, res) => {
    console.log(req.userId);
    try {
      const { name, description, location, contact } = req.body;
      const organization = new Organization({ 
        name, 
        description, 
        location, 
        contact,
        userId: req.userId // Link the organization to the user
      });
      await organization.save();
      
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { $push: { organization: organization._id } }, 
        { new: true }
      );
  

      res.status(201).json({ message: 'Organization created successfully', organization });
    } catch (error) {
      res.status(500).json({ error: 'Unable to create organization', message: error.message });
    }
  },

  // Get all organizations
  getAllOrganizations: async (req, res) => {
    try {
      const organizations = await Organization.find();
      res.status(200).json({ organizations });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch organizations', message: error.message });
    }
  },

  // Get organization by ID
  getOrganizationById: async (req, res) => {
    try {
      const organization = await Organization.findById(req.params.id);
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
      res.status(200).json({ organization });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch organization', message: error.message });
    }
  },

  // Update organization by ID
  updateOrganization: async (req, res) => {
    try {
      const { name, description, location, contact } = req.body;
      const updatedOrganization = await Organization.findByIdAndUpdate(
        req.params.id,
        { name, description, location, contact },
        { new: true }
      );
      if (!updatedOrganization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
      res.status(200).json({ message: 'Organization updated successfully', organization: updatedOrganization });
    } catch (error) {
      res.status(500).json({ error: 'Unable to update organization', message: error.message });
    }
  },

  // Delete organization by ID
  deleteOrganization: async (req, res) => {
    try {
      const deletedOrganization = await Organization.findByIdAndDelete(req.params.id);
      if (!deletedOrganization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
      res.status(200).json({ message: 'Organization deleted successfully', organization: deletedOrganization });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete organization', message: error.message });
    }
  }
};

module.exports = organizationController;
