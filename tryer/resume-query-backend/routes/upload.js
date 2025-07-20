const express = require('express');
const multer = require('multer');
const { parseResume } = require('../parser');
const Resume = require('../models/Resume');

const router = express.Router();
const upload = multer();

router.post('/', upload.array('resumes'), async (req, res) => {
  const parsedResumes = [];
  for (const file of req.files) {
    const data = await parseResume(file.buffer, file.mimetype);
    const resume = new Resume(data);
    await resume.save();
    parsedResumes.push(resume);
  }
  res.json(parsedResumes);
});

module.exports = router;
