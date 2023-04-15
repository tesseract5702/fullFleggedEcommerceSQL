const pool = require("../database/initsql");

module.exports = async function(sellerId)
{
    let [sellerName,field] = await pool.query('SELECT user.name FROM products inner join user on products.sellerid = user.id')
}