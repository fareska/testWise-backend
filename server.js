const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const menu = require('./server/routes/menu');
const restaurants = require('./server/routes/restaurants');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.SQL_DB_URI);
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

app.use('/restaurants/', restaurants);
app.use('/menu', menu);

const port = process.env.PORT || 3200;
app.listen(port, () => {
    `server running on port ${port}`
});