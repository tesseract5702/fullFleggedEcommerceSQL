const pool = require("../database/initsql")

module.exports =async function(mail,prodID)
{
    try
    {
        let[cartItems,fields] = await pool.query('SELECT * FROM `cart` inner join `products` on cart.productid = products.id where `userid`=? and isAvailable = 1 and id=?',[`${mail}`,prodID]);
        //console.log(cartItems,"cartUsingUser");
        return cartItems;
    }
    catch(err)
    {
        console.log("There is an error connecting to the server",err);
        //res.send("404");
    }
}