
import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';

import db from './models';

const app: Application = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);



app.use('/api/uploads', express.static('uploads'));


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
  .catch((err: Error) => {
    console.error('❌ No se pudo conectar a la base de datos:', err.message);
  });
