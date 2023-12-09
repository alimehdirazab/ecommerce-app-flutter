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

mongoose.connect("mongodb+srv://alimehdirazab:alipass@cluster0.3ih62mr.mongodb.net/ecommerce?retryWrites=true&w=majority")

const userRoutes = require('./router/user_routers');

app.use('/api/user', userRoutes);

const PORT = 5555;
app.listen(PORT, () => console.log('Server is Running on Port : ', +PORT));