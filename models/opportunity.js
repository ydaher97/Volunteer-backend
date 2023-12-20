const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  place: String,
  category:String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});


opportunitySchema.index({ location: '2dsphere' });

const Opportunity = mongoose.model('Opportunity', opportunitySchema);
module.exports = { Opportunity };
