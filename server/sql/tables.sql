USE sql_res;

-- DELETE FROM item;
-- DELETE FROM menu;
-- DELETE FROM restaurant;

-- SELECT * FROM restaurant;
-- SELECT * FROM menu;
-- SELECT * FROM item;

-- ALTER TABLE item
-- MODIFY COLUMN item_price DECIMAL(10 , 2 ) ;

-- CREATE TABLE restaurant(
--     res_id BIGINT NOT NULL,
--     res_name VARCHAR(100), 
--     img VARCHAR(10000),
--     res_phone VARCHAR(20),
--     res_website VARCHAR(1000),
--     address VARCHAR(1000),
--     PRIMARY KEY (res_id)
-- );

-- CREATE TABLE menu(
--     menu_id INT NOT NULL AUTO_INCREMENT,
--     menu_name VARCHAR(100),
--     res_id BIGINT,
--     FOREIGN KEY (res_id) REFERENCES restaurant(res_id),
--     PRIMARY KEY (menu_id)
-- );

-- CREATE TABLE item(
--     item_id INT NOT NULL AUTO_INCREMENT,
--     item_name VARCHAR(100),
--     item_price INT, 
--     price_currency VARCHAR(100),
--     price_string VARCHAR(100),
--     menu_id INT,
--     FOREIGN KEY (menu_id) REFERENCES menu(menu_id),
--     PRIMARY KEY (item_id)
-- )

-- ALTER TABLE restaurant
-- MODIFY COLUMN res_id BIGINT;

-- ALTER TABLE restaurant
-- ADD managerEmail VARCHAR(1000);

-- ALTER TABLE restaurant
-- ADD menu_id BOOL;

-- INSERT INTO restaurant VALUES(4087130073430400, "Prozdor", "https://picsum.photos/200/100",
--  "(456) 281-3494)",
--   "https://locations.panerabread.com/ny/huntington/345-main-street.html?utm_medium=display-ad&utm_source=paid-digital&utm_campaign=yext&utm_content=local-search",
--   "345 Main Street Huntington, NY 11743");


-- INSERT INTO menu VALUES(null, "Beverages", 4087130073430400);

-- INSERT INTO item VALUES(null, "Regular Coffee", 2.25, "USD", "$2.25", 1);


-- SELECT * FROM restaurant AS r, item AS i, menu AS m
-- WHERE r.res_id = m.res_id AND m.menu_id = i.menu_id;

-- SELECT menu_id FROM  menu AS m
-- WHERE m.res_id = 4087130073430400;

-- SELECT * FROM restaurant AS r, menu AS m
-- WHERE m.res_id = 4323271276139636;

-- SELECT * FROM  menu
-- WHERE menu.res_id = 4078070073775700;

-- SELECT * FROM  menu AS m, item AS i
-- WHERE m.res_id = 4076500073091100 AND i.menu_id = m.menu_id;

-- SELECT * FROM restaurant LIMIT 3 OFFSET 10;


-- SELECT * FROM  menu ;