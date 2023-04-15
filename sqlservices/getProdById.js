const pool = require("../database/initsql");

module.exports = async function(prodID)
{
    const[prod,fields]= await pool.query('SELECT * FROM `products` where `isAvailable`=1 and id=?',[prodID]);
    return prod;
}