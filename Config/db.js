const oracledb = require('oracledb');

async function initOracleDB() {
  try {
    await oracledb.createPool({
      user: 'system',
      password: 'anusheikh',
      connectString: 'localhost/orclpdb1' // Replace this with your actual Oracle DB connect string
    });

    console.log("✅ Oracle DB connected successfully");
  } catch (err) {
    console.error("❌ Oracle DB connection error:", err);
    process.exit(1);
  }
}

module.exports = initOracleDB;
