
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const getConnection = require('../db');

// Register Route with Oracle DB
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const conn = await getConnection();
  
      // Check if email already exists
      const result = await conn.execute(
        `SELECT * FROM users WHERE email = :email`,
        [email],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
  
      if (result.rows.length > 0) {
        return res.status(400).json({ message: 'Email already registered.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert into DB
      await conn.execute(
        `INSERT INTO users (name, email, password) VALUES (:name, :email, :password)`,
        [name, email, hashedPassword],
        { autoCommit: true }
      );
  
      res.json({ message: 'Registration successful!' });
    } catch (err) {
      console.error('Registration Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
