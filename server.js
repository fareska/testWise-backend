const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const api = require('./server/routes/api');
const menu = require('./server/routes/menu');
const restaurants = require('./server/routes/restaurants');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.SQL_DB_URI);
// const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

app.use(morgan('dev'))

// app.use('/', api)
app.use('/restaurants/', restaurants)
app.use('/menu', menu)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            message: error.message
        }
    });
});

const port = process.env.PORT || 3200;
app.listen(port, () => {
    `server running on port ${port}`
});