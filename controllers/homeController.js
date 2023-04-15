const getProd = require("../sqlservices/getProd");

 async function home_controller(req,res){
    let products = await getProd(0,8);
    if(req.session.user.role === "user")
    {
        res.render("home",{username:req.session.user.name,products:products,size:"4"});
    }
    else if(req.session.user.role === "seller")
    {
        res.redirect("/seller");
    }
}

module.exports = home_controller;