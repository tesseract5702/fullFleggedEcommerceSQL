const sendMail = require('../methods/sendMail');
const getUser = require("../sqlservices/getUser");
const putUser = require("../sqlservices/putUser");

async function adduser_controller(req,res)
{
    let { username, mail, password } = req.body;
	let data = await getUser(req);
	if(data.length)
	{
		res.render("signup",{err:"User Already Exist",errNF : ""});
	}
	else
	{
		try
		{
			let result = await putUser(req);
			let userData = await getUser(req);
			sendMail(mail,userData[0].mailToken,function(err,data)
				{
					if(err)
					{
						res.render("signup",{err:"",errNF:"Something went wrong"});
						return
					}
					req.session.isLoggedIn=true;
					req.session.user=userData[0];
					//console.log(req.session.user.role,req.session.user.role==="seller");
					if(req.session.user.role === "seller")
					{
						//console.log("Seller Home chala");
						res.redirect("/seller");
						return;
					}
					else{
						res.redirect("/");
					}
			})
		}
		catch(err)
		{
			console.log(err,"141");
		}
	}
}

module.exports = adduser_controller;