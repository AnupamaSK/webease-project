const express = require('express');
const cors = require('cors');
const app = express();
const dataRoutes = require('./routes/dataRoutes');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Serve frontend files from 'public'
app.use(express.static('public'));

// ✅ (Optional) To serve uploaded files like photos
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', dataRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 Server running on http://localhost:${PORT');
});