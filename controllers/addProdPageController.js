function addProductPage_controller(req,res)
{
    if(req.session.user.role === "admin" || req.session.user.role === "seller")
	{	
		res.render("addProduct",{username:req.session.user.name,role:req.session.user.role});
	}
	else
	{
		res.redirect("/")
	}
}

module.exports=addProductPage_controller;