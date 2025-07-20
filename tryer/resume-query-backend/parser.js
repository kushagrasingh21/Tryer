const pdfParse = require('pdf-parse');

const parseResume = async (fileBuffer, mimetype) => {
  if (mimetype !== 'application/pdf') {
    throw new Error('Unsupported file type. Only PDFs are allowed.');
  }

  const pdfData = await pdfParse(fileBuffer);
  const text = pdfData.text;
  const cleanText = text.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ');

  const extractField = (keywords, text) => {
    for (let keyword of keywords) {
      const pattern = new RegExp(`${keyword}\\s*[:\\-]?\\s*(.*?)(?=\\s{2,}|$)`, 'i');
      const match = text.match(pattern);
      if (match && match[1]) return match[1].trim();
    }
    return '';
  };

  const extractArray = (keywords, text) => {
    const raw = extractField(keywords, text);
    if (!raw) return [];
    return raw.split(/[,|•|·|\u2022|\n]/).map(item => item.trim()).filter(Boolean);
  };

  const extractEmail = (text) => {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(regex);
  return matches ? matches[0] : '';
};

const extractPhone = (text) => {
  const regex = /(?:\+91[-\s]?)?(?:\(?\d{3}\)?[-\s]?)?\d{3}[-\s]?\d{4}/g;
  const matches = text.match(regex);
  if (matches) {
    // filter only valid Indian mobile numbers (starting with 6-9 and 10 digits)
    const validPhones = matches.filter(num => {
      const digits = num.replace(/\D/g, '');
      return digits.length === 10 && /^[6-9]/.test(digits);
    });
    return validPhones.length > 0 ? validPhones[0] : '';
  }
  return '';
};

  const extractExperience = (text) => {
    const match = text.match(/(\d+\+?\s*(years|yrs|year))/i);
    return match ? match[0] : '';
  };

  const extractName = (text) => {
    const lines = text.trim().split(/\n|\. /);
    for (let line of lines) {
      if (line.length < 50 && !line.match(/[@:]/) && /^[A-Z][a-z]+\s[A-Z][a-z]+/.test(line)) {
        return line.trim();
      }
    }
    return '';
  };

  const name = extractField(['Name', 'Full Name'], cleanText) || extractName(text);
  const email = extractEmail(cleanText);
   const phone = extractPhone(cleanText);
  const contactInfo = [email, phone].filter(Boolean).join(' | ');
  const experience = extractField(['Experience', 'Work Experience', 'Professional Experience'], cleanText) || extractExperience(text);
  const location = extractField(['Location', 'Address', 'City'], cleanText);
  const skills = extractArray(['Skills', 'Technical Skills', 'Skill Set'], cleanText);
  const projects = extractArray(['Projects', 'Project Experience'], cleanText);

  return {
    name: name || 'Unknown',
    email: email || 'Not found',
    phone: phone || 'Not found',
    contactInfo: contactInfo || 'Not available',
    experience: experience || 'N/A',
    location: location || 'N/A',
    skills,
    projects
  };
};

module.exports = { parseResume };
