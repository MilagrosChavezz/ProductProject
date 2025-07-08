
import express, { Application } from 'express';
import cors from 'cors';
import { initializeDefaults } from './startup/init';
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
    console.log('✅ Connected to the database successfully.');
    return db.sequelize.sync();
  })
  .then(async () => {
    await initializeDefaults();
    app.listen(PORT, () => {
      
      console.log(`Server listening to port: ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('❌ Connection error:', err.message);
  });
