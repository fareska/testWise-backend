const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const data = require('../../data');
const sequelize = new Sequelize(process.env.SQL_DB_URI);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const SqlManager = require('../sql/sqlManager');
const sqlManager = new SqlManager();


const mData = async (resData) => {
    for (const res of resData) {
        await sqlManager.addRestaurant(res);

        if (res.menus.section_name) {
            await sqlManager.addMenu(res.menus.section_name, res.restaurant_id);
            let menuId = await sqlManager.getMenuId(res.restaurant_id);
            
            for (const item of res.menus.menu_items) {
            await sqlManager.addItem(item, menuId);
            }
        }
    }
}

let Data = JSON.stringify(data);
let resData = JSON.parse(Data);

mData(resData);
