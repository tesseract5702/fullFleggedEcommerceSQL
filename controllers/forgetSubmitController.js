const getUser = require("../sqlservices/getUser");
const getUserUsingSession = require("../sqlservices/getUserUsingSession");
const forgetMail = require("../methods/forgetPass");

async function forgetSubmit_controller(req,res)
{
    //let user = await getUser(req);
    let user = await getUser(req);
	// console.log(user.length,user,"forgetSubmitController");
	if(user.length)
	{
		req.session.user = user[0];
		forgetMail(req.body.mail,req.session.user.mailToken,(err,data)=>{
			if(err)
			{
				console.log("Something went wrong.",err);
				res.redirect("/login");
			}
			res.redirect("/resetPass");
		})
	}
	else{
		res.render("forget",{err:"Enter correct email id"})
	}
}

module.exports = forgetSubmit_controller;