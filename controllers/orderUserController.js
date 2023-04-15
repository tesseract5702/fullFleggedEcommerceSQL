const orderUser = require("../sqlservices/orderUser");

module.exports = async function(req,res)
{
    if(req.session.user.role === "user")
    {
        let orders = await orderUser(req.session.user.email);
        //console.log(orders);
        res.render("orderUser",{username:req.session.user.name,cartItems:orders})
    }
    else
    {
        res.redirect("/");
    }
}