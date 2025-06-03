const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Middleware for parsing JSON bodies se utiliza para leer el cuerpo (body) de las solicitudes HTTP

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(bodyParser.json());


app.get('/api/products', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'Product A',
      price: 100,
      description: 'Desc A',
      imageUrl: 'https://example.com/a.jpg',
      category: 'Category A'
    },
    {
      id: '2',
      name: 'Product B',
      price: 200,
      description: 'Desc B',
      imageUrl: 'https://example.com/b.jpg',
      category: 'Category B'
    }
  ]);
});



app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
 
  if (email === 'test@example.com' && password === '123456') {
    res.json({ success: true, token: 'abc123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
