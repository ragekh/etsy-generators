const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-keywords
 * @desc Generate Etsy product keywords based on product name and description
 * @access Public
 */
router.post('/', validateRequest(['productName', 'description']), async (req, res) => {
  try {
    const { productName, description } = req.body;
    
    const prompt = `Generate a list of 10-15 relevant keywords for an Etsy product named "${productName}" with this description: ${description}. List each keyword on a new line, optimized for search visibility.`;
    
    const result = await generateText(prompt, { max_tokens: 350 });
    res.json({ result });
  } catch (error) {
    console.error('Keywords Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate keywords' });
  }
});

module.exports = router;