const express = require('express');
const router = express.Router();
const { generateText } = require('../utils/ai');
const { validateRequest } = require('../middleware/validation');

/**
 * @route POST /api/generate-customer-response
 * @desc Generate Etsy customer response based on inquiry type and details
 * @access Public
 */
router.post('/', validateRequest(['inquiryType', 'details']), async (req, res) => {
  try {
    const { inquiryType, details, timestamp } = req.body;
    
    const prompt = `Write a polite, professional response to a customer's ${inquiryType} on Etsy: ${details}. Keep it concise, friendly, and helpful. The tone should be warm but professional.`;
    
    // Pass timestamp to prevent caching when regenerating
    const result = await generateText(prompt, { max_tokens: 350, timestamp });
    res.json({ result });
  } catch (error) {
    console.error('Customer Response Generator Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate customer response' });
  }
});

module.exports = router;