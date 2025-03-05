const express = require('express');
const router = express.Router();

// Import route modules
const shopNameRoutes = require('./shop-name');
const descriptionRoutes = require('./description');
const keywordsRoutes = require('./keywords');
const titleRoutes = require('./title');
const customerResponseRoutes = require('./customer-response');
const shopBioRoutes = require('./shop-bio');
const promotionRoutes = require('./promotion');
const announcementRoutes = require('./announcement');

// Register routes
router.use('/api/generate-shop-name', shopNameRoutes);
router.use('/api/generate-description', descriptionRoutes);
router.use('/api/generate-keywords', keywordsRoutes);
router.use('/api/generate-title', titleRoutes);
router.use('/api/generate-customer-response', customerResponseRoutes);
router.use('/api/generate-shop-bio', shopBioRoutes);
router.use('/api/generate-promotion', promotionRoutes);
router.use('/api/generate-announcement', announcementRoutes);

module.exports = router;