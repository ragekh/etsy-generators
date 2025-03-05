const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-announcement
 * @desc Generate Etsy shop announcement based on announcement type and details
 * @access Public
 */
router.post('/', validateRequest(['announcementType', 'details']), async (req, res) => {
  try {
    const { announcementType, details } = req.body;
    
    const prompt = `Generate a clear, concise Etsy shop announcement for ${announcementType} with these details: ${details}. The announcement should be informative, professional, and easy to understand at a glance.`;
    
    const result = await generateText(prompt, { max_tokens: 300 });
    res.json({ result });
  } catch (error) {
    console.error('Announcement Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate announcement' });
  }
});

module.exports = router;