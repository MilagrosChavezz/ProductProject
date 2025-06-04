const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json()); 



db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
