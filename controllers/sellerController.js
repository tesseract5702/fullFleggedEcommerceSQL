const getProdSeller = require("../sqlservices/getProdSeller");

async function seller_controller(req,res)
{
    if(req.session.user)
	{
		if(req.session.user.role === "seller")
		{
            if(req.session.user.isVerified)
            {
                let products = await getProdSeller(0,4,req);
                res.render("seller",{username:req.session.user.name,products:products,size:"1",err:""});		
            }
            else
            {
                res.render("notVerified");
            }
		}
		else if(req.session.user.role === "admin")
		{
			res.redirect("/admin");
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

module.exports = seller_controller;