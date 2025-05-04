const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Route to save introduction
router.post('/saveIntro', dataController.saveIntro);

// Route to save books
router.post('/saveBooks', dataController.saveBooks);

// Route to save awards
router.post('/saveAwards', dataController.saveAwards);

// Route to get final data for preview (from session or mock)
router.get('/getFinalData', dataController.getFinalData);

// ✅ New route to get all users for the showcase page
router.get('/getAllUsers', dataController.getAllUsers);

module.exports = router;
