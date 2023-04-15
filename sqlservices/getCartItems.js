const pool = require("../database/initsql");

module.exports = async function(mail)
{
    let [cartItem,fields] = await pool.query(`select * from cart inner join products on cart.productid = products.id where userid = ? and isAvailable=1`,[`${mail}`]);
    //console.log(cartItem);
    return cartItem;
}