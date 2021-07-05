
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.SQL_DB_URI);
const SqlManager = require('../sql/sqlManager');
const sqlManager = new SqlManager();

// router.post('/restaurant', async function (req, res) {
//     const { restaurant_id, restaurant_name, img, restaurant_phone, restaurant_website, address, managerEmail } = req.body
//     let addResResult = await sqlManager.addRestaurant(restaurant_id, restaurant_name, img, restaurant_phone, restaurant_website, address, managerEmail)    
//     res.send(addResResult)
// })

router.get('/restaurants/:page', async function (req, res) {
        try {
                if (req.query.hasMenu === 'true') {
                        let result = await sqlManager.getRestaurantsWithMenu(req.params.page);
                        res.status(200).send(result);
                } else {
                        let result = await sqlManager.getRestaurants(req.params.page);
                        res.status(200).send(result); //200 is default 
                };
        } catch (err) {
                res.status(404).send(err.message);
        };
});

router.get('/menu/:id', async (req, res) => {
        try {
                let result = await sqlManager.getMenu(req.params.id);
                result === "Restaurant doesn't exist"
                        ? res.send(404).send("Restaurant doesn't exist")
                        : res.status(200).send(result);
        } catch (err) {
                res.status(404).send(err.message);
        };

});

router.get('/menu/edit/:id', async (req, res) => {
        try {
                if (req.query.isAdmin === 'true') {
                        let result = await sqlManager.getMenu(req.params.id);
                        res.status(200).send(result);
                } else {
                        res.send(401).send('Only admins allowed to update the menu');
                }

        } catch (err) {
                res.status(404).send(err.message);
        }
});

router.put('/menu', async function (req, res) {
        const { table, col, id, newVal } = req.body
        if (table === 'menu') {
                const result = await sqlManager.updateMenu(col, newVal, id);
                res.status(201).send(result);
        }
        if (table === 'item') {
                const result = await sqlManager.updateItem(col, newVal, id);
                res.status(201).send(result);
        }
});

module.exports = router;

// router.get('/menu/:id', async function (req, res) {
//         let result = await sqlManager.getMenu(req.params.id)
//         res.status(200).send(result)
// })


// if (request.method === 'POST' && request.url === '/echo') {

//       } else {
//         response.statusCode = 404;
//         response.end();
//       }
