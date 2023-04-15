const delProd = require("../sqlservices/delProd");

async function adminDelProduct_controller(req,res)
{
    if(req.session.user.role === "admin" || req.session.user.role === "seller")
	{
		let prodID = parseInt(req.params.prodID);
		let product = await delProd(prodID);
		if(req.session.user.role === "admin")
		{
			res.redirect("/admin");
		}
		else
		{
			res.redirect("/seller")
		}
	}
	else
	{
		res.redirect("/")
	}
}

module.exports = adminDelProduct_controller;