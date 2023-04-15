const pool = require("../database/initsql");

module.exports = async function(page,products,req)
{
    const[prod,fields]= await pool.query('SELECT * FROM `products` where `isAvailable`=1 and `sellerid`= ? LIMIT ?,?',[`${req.session.user.email}`,page*products,products]);
    return prod;
}