const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: String,
  experience: String,
  location: String,
  skills: [String]
});

module.exports = mongoose.model('Resume', ResumeSchema);
