const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-promotion
 * @desc Generate Etsy promotion text based on promotion type and product details
 * @access Public
 */
router.post('/', validateRequest(['promotionType', 'productDetails']), async (req, res) => {
  try {
    const { promotionType, productDetails, timestamp } = req.body;
    
    const prompt = `Write a short, catchy promotion text for an Etsy ${promotionType} featuring ${productDetails}. Include a call-to-action. Keep it under 100 characters if possible, and make it exciting and compelling.`;
    
    // Pass timestamp to prevent caching when regenerating
    const result = await generateText(prompt, { max_tokens: 200, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Promotion Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate promotion text' });
  }
});

module.exports = router;