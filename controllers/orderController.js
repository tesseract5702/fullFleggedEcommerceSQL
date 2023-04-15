const order = require("../sqlservices/order");

module.exports = async function(req,res)
{
    if(req.session.isLoggedIn)
    {
        if(req.session.user.role === "seller")
        {
    
            let page = 1;
            let products = 8;
            let orders = await order(req.session.user.email,page,products);
            //console.log(orders);
            res.render("sellerOrders",{username:req.session.user.name,cartItems:orders});
        }
        else
        {
            res.redirect("/");
        }
    }
    else
    {
        res.redirect("/login");
    }
}