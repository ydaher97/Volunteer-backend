const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');

// Create a new opportunity
router.post('/', opportunityController.createOpportunity);

// Get all opportunities
router.get('/', opportunityController.getAllOpportunities);

// Get opportunity by ID
router.get('/:id', opportunityController.getOpportunityById);

// Update opportunity by ID
router.put('/:id', opportunityController.updateOpportunity);

// Delete opportunity by ID
router.delete('/:id', opportunityController.deleteOpportunity);

module.exports = router;
