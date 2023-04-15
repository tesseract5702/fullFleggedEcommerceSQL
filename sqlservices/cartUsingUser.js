const pool = require("../database/initsql")

async function cartUsingUser(mail)
{
    try
    {
        let[cartItems,fields] = await pool.query('SELECT * FROM `cart` inner join `products` on cart.productid = products.id where `userid`=? and isAvailable = 1',[`${mail}`]);
        //console.log(cartItems,"cartUsingUser");
        return cartItems;
    }
    catch(err)
    {
        console.log("There is an error connecting to the server",err);
        //res.send("404");
    }
}

async function cartMailElementMatch(mail,prodID)
{
    try
    {
        let[cartItems,fields] = await pool.query('SELECT * FROM `cart` inner join `products` on cart.productid = products.id where `userid`=? and productid = ?',[`${mail}`,prodID]);
        return cartItems;
    }
    catch(err)
    {
        console.log("There is an error connecting to the server",err);
        //res.send("404");
    }
}

async function cartUpdateItem(check,mail,prodID)
{
    try
    {
        if(check === 1)
        {
            let result = await pool.query(`update cart set cartQuantity = cartQuantity+1 where userid='${mail}' and productid = ${prodID}`);
        }
        else if(check === 0)
        {
            
            let result = await pool.query(`update cart set cartQuantity = cartQuantity-1 where userid='${mail}' and productid = ${prodID} and cartQuantity and cartQuantity>1`);
            
        }
        
    }
    catch(err)
    {
        console.log("There is an error connecting to the server",err);
        //res.send("404");
    }
}

async function cartPush(mail,prodID)
{
    try
    {
        //console.log(mail,prodID);
        let result = await pool.query(`insert into cart(userid,productid,cartQuantity) values('${mail}','${prodID}','1')`)
        //console.log(result);
    }
    catch(err)
    {
        console.log("There is an error connecting to the server",err);
    }
}

async function deleteItem(mail,prodID)
{
    try
    {
        let result = await pool.query(`Delete from cart where userid='${mail}' and productid=${prodID}`);
        return result;
    }
    catch(err)
    {
        console.log("There is an error connecting to the server",err);
    }
}

module.exports = {cartUsingUser,cartMailElementMatch,cartUpdateItem,cartPush,deleteItem};