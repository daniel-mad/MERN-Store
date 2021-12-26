const express = require('express');
const cors = require('cors');
const brandRoutes = require('./routes/brandRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const colorRoutes = require('./routes/colorRoutes');
const productFitsRoutes = require('./routes/productFitsRoutes');
const productRoutes = require('./routes/productRoutes');
const sizeRoutes = require('./routes/sizeRoutes');

const connectDB = require('./config/db');
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);
app.use('/brands', brandRoutes);
app.use('/categories', categoryRoutes);
app.use('/productfits', productFitsRoutes);
app.use('/colors', colorRoutes);
app.use('/sizes', sizeRoutes);

app.get('/', (req, res) => {
  res.send('Hello from STORE API');
});

module.exports = app;
