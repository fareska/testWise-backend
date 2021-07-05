const dotenv = require('dotenv').config()
const Sequelize = require('sequelize');

class SQLManager {
    constructor() {
        this.sequelize = new Sequelize(process.env.SQL_DB_URI);
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    async addRestaurant(resObj) {
        let resId = resObj.restaurant_id;
        let resName = resObj.restaurant_name;
        let resImg = resObj.img;
        let resPhone = resObj.restaurant_phone;
        let resWeb = resObj.restaurant_website;
        let resAddress = resObj.address.formatted;
        let managerEmail = resObj.manager_email;
        let menuId = resObj.menus.section_name ? 1 : 0;

        const result = await this.sequelize.query(`INSERT INTO restaurant
        VALUES(${resId}, "${resName}", "${resImg}",
        "${resPhone}", "${resWeb}", "${resAddress}", "${managerEmail}", ${menuId}); `);

        if (result)
            return "Restaurant has been created successfully!"
        else "Something went wrong!";
    }

    async addMenu(menuName, resId) {
        const result = await this.sequelize.query(`
        INSERT INTO menu VALUES(null, "${menuName}", ${resId}); `);

        if (result)
            return "Menu has been created successfully!"
        else "Something went wrong!";
    }

    async addItem(itemObj, menuId) {
        const result = await this.sequelize.query(`
        INSERT INTO item VALUES(null, "${itemObj.name}", ${itemObj.price}, "${itemObj.pricing[0].currency}", "${itemObj.pricing[0].priceString}", ${menuId})
        `);

        if (result)
            return "Item has been created successfully!"
        else "Something went wrong!";
    }

    async getMenuId(resId) {
        const result = await this.sequelize.query(`
        SELECT menu_id FROM  menu AS m WHERE m.res_id = ${resId};
        `);
        if (result)
            return result[0][0].menu_id
        else "Something went wrong!";
    }

    async getRestaurants(page) {
        let offset = (page-1)*3
        let data = []
        const result = await this.sequelize.query(`SELECT * FROM restaurant LIMIT 3 OFFSET ${offset};`)
        const totalRows = await this.sequelize.query(`SELECT COUNT (*) FROM restaurant`)
        data.push(result[0], totalRows[0])
        if (data){
                return data
        }
        else "Something went wrong!"
    }
    
    async getRestaurantsWithMenu(page){
        let offset = (page-1)*3
        let data = []
        const result = await this.sequelize.query(`SELECT * FROM restaurant WHERE restaurant.menu_id =1 LIMIT 3 OFFSET ${offset} ;`)
        const totalRows = await this.sequelize.query(`SELECT COUNT (*) FROM restaurant WHERE restaurant.menu_id =1`)
        data.push(result[0], totalRows[0])
        if (data)
            return data
        else "Something went wrong!"

    }

    async getMenu(resId) {
        const result = await this.sequelize.query(`
            SELECT i.item_id, i.item_name, i.price_string
            FROM  menu AS m, item AS i
            WHERE m.res_id = ${resId} AND i.menu_id = m.menu_id;`)

        const menuName = await this.sequelize.query(`
        SELECT menu.menu_name, menu.menu_id FROM menu WHERE menu.res_id = ${resId};`)
        if (result && menuName[0][0]) {
            console.log(menuName[0][0]);
            console.log(menuName[0][0] ? 'true' : 'false');
            let data = {
                menuName: menuName[0][0].menu_name,
                menuId: menuName[0][0].menu_id,
                items: result[0]
            }
            return data
        }

        else return  "Restaurant doesn't exist"
    }

    async updateItem(colName, value, itemId) {
        const result = await this.sequelize.query(`
            UPDATE item
            SET ${colName} = '${value}'
            WHERE item.item_id = ${itemId};
        `)
        if (result)
            return "Item has been updated successfully!"
        else "Sorry something went wrong, try again later!"
    }


    async updateMenu(colName, value, menuId) {
        const result = await this.sequelize.query(`
        UPDATE menu
        SET ${colName} = '${value}'
        WHERE menu.menu_id = ${menuId};
        `)
        if (result)
            return "Item has been updated successfully!"
        else "Sorry something went wrong, try again later!"
    }

}

module.exports = SQLManager;
