const getProd = require("../sqlservices/getProd");

async function admin_controller(req,res)
{
    if(req.session.user)
	{
		if(req.session.user.role === "admin")
		{
			let products = await  getProd(0,8);
			res.render("admin",{username:req.session.user.name,products:products,size:"4",err:""});		
		}
		else if(req.session.user.role === "seller")
		{
			res.redirect("/seller");
		}
		else{
			res.redirect("/");
		}
	}
	else
	{
		res.redirect("/login");
	}
}

module.exports = admin_controller;