const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-shop-bio
 * @desc Generate Etsy shop bio based on shop focus, owner details, and unique selling point
 * @access Public
 */
router.post('/', validateRequest(['shopFocus', 'ownerDetails', 'uniqueSellingPoint']), async (req, res) => {
  try {
    const { shopFocus, ownerDetails, uniqueSellingPoint, timestamp } = req.body;
    
    const prompt = `Create a concise, engaging Etsy shop bio (150-300 words) for a shop focused on ${shopFocus}, run by ${ownerDetails}, with a unique selling point of ${uniqueSellingPoint}. The bio should be welcoming, authentic, and highlight what makes this shop special.`;
    
    const result = await generateText(prompt, { max_tokens: 500, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Shop Bio Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate shop bio' });
  }
});

module.exports = router;