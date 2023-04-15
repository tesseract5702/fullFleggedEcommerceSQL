const pool = require("../database/initsql");

module.exports = async function(req,cart,price,paymentMethod,callback)
{
    try
    {
        let {houseNumber,landmark,street,city,state,pincode,phone,radio}=req.body;
        console.log(req.body);
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const orderDate = `${year}-${month}-${day}`;
        const deliveryDate = `${year}-${month}-${day+7}`;
        //console.log(cart,"transactioncod.js")
        await pool.query("START TRANSACTION");
        for(let i=0;i<cart.length;i++)
        {
            if(cart[i].inStock)
            {
                //console.log("Cart inStock chala")
                let updatedQuantity = cart[i].quantity-cart[i].cartQuantity;
                await pool.query(`update products set quantity = ${updatedQuantity} where id = ${cart[i].productid}`);
                await pool.query(`insert into orders(cartUserId,cartProductId,cartQuantity,totalPrice,orderStatus,orderDate,homeNo,landmark,street,city,state,pincode,phoneNo,paymentType,deliveryDate) values('${cart[i].userid}','${cart[i].productid}','${cart[i].cartQuantity}','${cart[i].cartQuantity*cart[i].price}','Pending','${orderDate}','${houseNumber}','${landmark}','${street}','${city}','${state}','${pincode}','${phone}','${paymentMethod}','${deliveryDate}')`);
                await pool.query(`Delete from cart where productid = ${cart[i].productid} and userid = '${cart[i].userid}'`);
            }
            else
            {
                await pool.query(`Delete from cart where productid = ${cart[i].productid} and userid = '${cart[i].userid}'`);
            }
        }
        pool.query("COMMIT");
        callback(1,cart);
    }
    catch(err)
    {
        console.log(err);
        await pool.query('ROLLBACK');
        callback(0,cart);
    }
}