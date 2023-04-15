const productModel = require("../schema/product");
const updateProd = require("../sqlservices/updateProd");

async function updateProduct_controller(req,res)
{
    if(req.session.user.role === "admin" || req.session.user.role === "seller")
	{
		let prodDet = req.body;
		let result = await updateProd(prodDet);
		res.json(result);
	}
	else
	{
		res.redirect("/")
	}
}

module.exports=updateProduct_controller;