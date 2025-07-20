const express = require('express');
const Resume = require('../models/Resume');

const router = express.Router();

router.get('/', async (req, res) => {
  const { name, location, experience, skills } = req.query;
  const query = {};

  if (name) query.name = new RegExp(name, 'i');
  if (location) query.location = new RegExp(location, 'i');
  if (experience) query.experience = new RegExp(experience, 'i');
  
  if (skills) {
    const skillArray = skills.split(',').map(s => s.trim());
    query.skills = { $all: skillArray }; // Must contain all skills
  }

  const results = await Resume.find(query);
  res.json(results);
});

module.exports = router;
