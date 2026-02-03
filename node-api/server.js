const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, () => console.log('Node API running on http://localhost:3000'));
