const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-description
 * @desc Generate Etsy product description based on product name and details
 * @access Public
 */
router.post('/', validateRequest(['productName', 'description']), async (req, res) => {
  try {
    const { productName, description } = req.body;
    
    const prompt = `Write a compelling and informative Etsy product description for a product named "${productName}" with the following details: ${description}. Keep it concise, engaging, and optimized for sales.`;
    
    const result = await generateText(prompt, { max_tokens: 400 });
    res.json({ result });
  } catch (error) {
    console.error('Description Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate description' });
  }
});

module.exports = router;