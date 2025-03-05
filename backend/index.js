require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const rateLimit = require('express-rate-limit');

const app = express();

// Apply rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
}));
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

const PORT = process.env.PORT || 5000;

// Helper function to generate text
async function generateText(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini', // Use a free or low-cost model; adjust as needed
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to generate content');
  }
}

// Shop Name Generator
app.post('/api/generate-shop-name', async (req, res) => {
  const { keywords } = req.body;
  if (!keywords) return res.status(400).json({ error: 'Keywords are required' });

  const prompt = `You are an expert in naming businesses, especially Etsy shops. Generate 5-10 unique, catchy, and memorable shop names for an Etsy shop focused on "${keywords}". List each name on a new line.`;
  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product Description Generator
app.post('/api/generate-description', async (req, res) => {
  const { productName, description } = req.body;
  if (!productName || !description) return res.status(400).json({ error: 'Product name and description are required' });

  const prompt = `Write a compelling and informative Etsy product description for a product named "${productName}" with the following details: ${description}. Keep it concise, engaging, and optimized for sales.`;
  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product Keywords Generator
app.post('/api/generate-keywords', async (req, res) => {
  const { productName, description } = req.body;
  if (!productName || !description) return res.status(400).json({ error: 'Product name and description are required' });

  const prompt = `Generate a list of 10-15 relevant keywords for an Etsy product named "${productName}" with this description: ${description}. List each keyword on a new line, optimized for search visibility.`;
  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listing Title Generator
app.post('/api/generate-title', async (req, res) => {
  const { productName, features } = req.body;
  if (!productName || !features) return res.status(400).json({ error: 'Product name and features are required' });

  const prompt = `Create a concise, attractive, and search-friendly Etsy listing title for a product named "${productName}" with these key features: ${features}. Keep it under 70 characters.`;
  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Customer Response Generator
app.post('/api/generate-customer-response', async (req, res) => {
  const { inquiryType, details } = req.body;
  if (!inquiryType || !details) return res.status(400).json({ error: 'Inquiry type and details are required' });

  const prompt = `Write a polite, professional response to a customer's ${inquiryType} on Etsy: ${details}. Keep it concise, friendly, and helpful. The tone should be warm but professional.`;
  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Shop Bio Generator
app.post('/api/generate-shop-bio', async (req, res) => {
  const { shopFocus, ownerDetails, uniqueSellingPoint } = req.body;
  if (!shopFocus || !ownerDetails || !uniqueSellingPoint)
    return res.status(400).json({ error: 'Shop focus, owner details, and unique selling point are required' });

  const prompt = `Create a concise, engaging Etsy shop bio (150-300 words) for a shop focused on ${shopFocus}, run by ${ownerDetails}, with a unique selling point of ${uniqueSellingPoint}. The bio should be welcoming, authentic, and highlight what makes this shop special.`;
  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Promotion Text Generator
app.post('/api/generate-promotion', async (req, res) => {
  const { promotionType, productDetails } = req.body;
  if (!promotionType || !productDetails) return res.status(400).json({ error: 'Promotion type and product details are required' });

  const prompt = `Write a short, catchy promotion text for an Etsy ${promotionType} featuring ${productDetails}. Include a call-to-action. Keep it under 100 characters if possible, and make it exciting and compelling.`;
  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Shop Announcement Generator
app.post('/api/generate-announcement', async (req, res) => {
  const { announcementType, details } = req.body;
  if (!announcementType || !details) return res.status(400).json({ error: 'Announcement type and details are required' });

  const prompt = `Generate a clear, concise Etsy shop announcement for ${announcementType} with these details: ${details}. The announcement should be informative, professional, and easy to understand at a glance.`;
  try {
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});