const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-title
 * @desc Generate Etsy listing title based on product name and features
 * @access Public
 */
router.post('/', validateRequest(['productName', 'features']), async (req, res) => {
  try {
    const { productName, features, timestamp } = req.body;
    
    const prompt = `Create a concise, attractive, and search-friendly Etsy listing title for a product named "${productName}" with these key features: ${features}. Keep it under 70 characters.`;
    
    const result = await generateText(prompt, { max_tokens: 100, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Title Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate title' });
  }
});

module.exports = router;