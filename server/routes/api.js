
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.SQL_DB_URI);
const SqlManager = require('../sql/sqlManager');
const sqlManager = new SqlManager();

router.post('/restaurant', async function (req, res) {
    const { restaurant_id, restaurant_name, img, restaurant_phone, restaurant_website, address, managerEmail } = req.body
    let addResResult = await sqlManager.addRestaurant(restaurant_id, restaurant_name, img, restaurant_phone, restaurant_website, address, managerEmail)    
    res.send(addResResult)
})
module.exports = router;