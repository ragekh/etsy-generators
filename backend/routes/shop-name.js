const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-shop-name
 * @desc Generate Etsy shop name based on keywords
 * @access Public
 */
router.post('/', validateRequest(['keywords']), async (req, res) => {
  try {
    const { keywords, timestamp } = req.body;
    
    const prompt = `You are an expert in naming businesses, especially Etsy shops. Generate 5-10 unique, catchy, and memorable shop names for an Etsy shop focused on "${keywords}". List each name on a new line.`;
    
    // Pass timestamp to generateText to control caching
    const result = await generateText(prompt, { timestamp });
    
    res.json({ result });
  } catch (error) {
    console.error('Shop Name Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate shop name' });
  }
});

module.exports = router;