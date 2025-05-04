const oracledb = require('oracledb');

async function testConnection() {
  try {
    oracledb.initOracleClient({
      libDir: 'C:\\Users\\Anupama - Personal\\Desktop\\Oracle\\instantclient_19_26'
    });

    const connection = await oracledb.getConnection({
      user: 'system',
      password: 'anusheikh',
      connectString: 'localhost/XE'
    });

    console.log('✅ Connected to Oracle DB!');
    await connection.close();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

testConnection();
