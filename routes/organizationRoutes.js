const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const auth = require('../middleware/auth');

// Create a new organization
router.post('/',auth, organizationController.createOrganization);

// Get all organizations
router.get('/',auth, organizationController.getAllOrganizations);

// Get organization by ID
router.get('/:id', organizationController.getOrganizationById);

// Update organization by ID
router.put('/:id',auth, organizationController.updateOrganization);

// Delete organization by ID
router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;
