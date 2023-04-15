const pool = require("../database/initsql");

module.exports = async function(page,products)
{
    const[prod,fields]= await pool.query('SELECT products.*,user.name as company FROM `products` inner join `user` on products.sellerid = user.email where `isAvailable`=1 LIMIT ?,?',[page*products,products]);
    //console.log(page*products);
    return prod;
}