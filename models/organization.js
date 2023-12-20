const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    location: String,
    contact: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    opportunities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity'
    }]
  });
  
  const Organization = mongoose.model('Organization', organizationSchema);
  
  
module.exports = { Organization};