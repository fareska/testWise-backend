
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const sequelize = new Sequelize(process.env.SQL_DB_URI);
const SqlManager = require('../sql/sqlManager');
const sqlManager = new SqlManager();

router.get('/:id', async (req, res) => {
        try {
                let result = await sqlManager.getMenu(req.params.id);
                result === "Restaurant doesn't exist"
                        ? res.send(404).send("Restaurant doesn't exist")
                        : res.send(result);
        } catch (err) {
                res.status(404).send(err.message);
        };

});

router.get('/edit/:id', async (req, res) => {
        try {
                if (req.query.isAdmin === 'true') {
                        let result = await sqlManager.getMenu(req.params.id);
                        result === "Restaurant doesn't exist"
                                ? res.send(404).send("Restaurant doesn't exist")
                                : res.send(result);
                } else {
                        res.send(403).send('Only admins allowed to update the menu');
                }

        } catch (err) {
                res.status(404).send(err.message);
        }
});


router.put('/', async function (req, res) {
        try{
                const { table, col, id, newVal } = req.body;
                if (table === 'menu') {
                        const result = await sqlManager.updateMenu(col, newVal, id);
                        res.status(201).send(result);
                }
                if (table === 'item') {
                        const result = await sqlManager.updateItem(col, newVal, id);
                        res.status(201).send(result);
                }
        } catch (err) {
                res.status(404).send(err.message);
        }
});

module.exports = router;