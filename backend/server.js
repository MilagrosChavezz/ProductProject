const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const db = require('./models');

const app = express();
const PORT = 3000;



app.use(cors());
app.use(express.json()); 

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a la base de datos');
    return db.sequelize.sync();  
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ No se pudo conectar a la base de datos:', err);
  });
