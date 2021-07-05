const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config(); 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.SQL_DB_URI);
const SqlManager = require('../sql/sqlManager');
const sqlManager = new SqlManager();

router.get('/:page', async function (req, res) {
    if (req.query.hasMenu === 'true') {
            let result = await sqlManager.getRestaurantsWithMenu(req.params.page);
            res.send(result);
    } else {
            let result = await sqlManager.getRestaurants(req.params.page);
            res.send(result); 
    }
});

module.exports = router;