const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', dataRoutes); // all API routes

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
