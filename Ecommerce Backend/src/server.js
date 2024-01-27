const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

//mongoose.connect("mongodb+srv://alimehdirazab:alipass@cluster0.3ih62mr.mongodb.net/ecommerce?retryWrites=true&w=majority");

const connectWithRetry = () => {
    mongoose.connect("mongodb+srv://alimehdirazab:alipass@cluster0.3ih62mr.mongodb.net/ecommerce?retryWrites=true&w=majority")
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err.message);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

const userRoutes = require('./router/user_routers');
app.use('/api/user', userRoutes);

const categoryRoutes = require('./router/category_routes');
app.use('/api/category', categoryRoutes);

const productRoutes = require('./router/product_routes');
app.use('/api/product', productRoutes);

const cartRoutes = require('./router/cart_routes');
app.use('/api/cart', cartRoutes);

const OrderRoutes = require('./router/oders_routes');
app.use('/api/order', OrderRoutes);

const PORT = 5555;
app.listen(PORT, () => console.log('Server is Running on Port : ', +PORT));