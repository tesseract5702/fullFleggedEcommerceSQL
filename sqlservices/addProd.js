const pool = require("../database/initsql");

module.exports = async function(req)
{
    let isAvailable = 1;
    let sql = `INSERT INTO products(name, quantity, sellerid, price, image, details, isAvailable) VALUES('${req.body.productname}','${req.body.prodQuantity}','${req.session.user.email}','${req.body.prodPrice}','${req.file.filename}','${req.body.prodDetails}','${isAvailable}')`;
    let result = await pool.query(sql);
}