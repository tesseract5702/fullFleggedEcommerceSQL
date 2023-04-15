const pool = require("../database/initsql");

module.exports = async function(mail,products)
{
    //console.log(products);
    let isAvailable = 1;
    let sql = `INSERT INTO products(name, quantity, sellerid, price, image, details, isAvailable) VALUES('${products.name}','${products.quantity}','${mail}','${products.price}','${products.image}','${products.description}','${isAvailable}')`;
    let result = await pool.query(sql);
    return result;
}