const getUser = require("../sqlservices/getUser");

async function login_controller(req,res)
{
    let user = await getUser(req);
	if(user.length===0)
	{
		res.redirect("/addUser");
		return;
	}
	if(user[0].role === "admin")
	{
		if(user[0].password === req.body.password)
		{
			req.session.isLoggedIn = true;
			req.session.user = user[0];
			res.redirect("/admin");
			return;
		}
		else
		{
			res.render("login",{errorlogin:"Username and Password doesn't match"});
			return;
		}
	}
	else if(user[0].role === "seller")
	{
		if(user[0].password === req.body.password)
		{
			req.session.isLoggedIn = true;
			req.session.user = user[0];
			res.redirect("/seller");
			return;
		}
		else
		{
			res.render("login",{errorlogin:"Username and Password doesn't match"});
			return;
		}
	}
	if(user.length) 
	{
		if(user[0].password === req.body.password)
		{
			if(user[0].isVerified)
			{
				req.session.isLoggedIn=true;
				req.session.user = user[0];
				res.redirect("/");
			}
			else{
				res.render("notVerified");
			}
		}
		else if(user[0].password !== req.body.password)
		{
			req.session.isLoggedIn = false;
			res.render("login",{errorlogin:"Username and Password doesn't match"});
		}
		
	}
	else
	{
		res.render("login",{errorlogin:"User not found!"});
	}
}

module.exports = login_controller;