const pool = require("../database/initsql");

module.exports = async function(mail,page,products)
{
    let[orders,fields] = await pool.query(`select * from orders inner join products on orders.cartProductId = products.id where cartUserId=?`,[`${mail}`]);
    return orders;
}