//const { model } = require("mongoose");
//const userModel = require("../schema/user");
const updateVerification = require("../sqlservices/updateVerification");
const getUserByMailToken = require("../sqlservices/getUserByMailToken");
const getUserUsingSession = require("../sqlservices/getUserUsingSession");

async function verify_controller(req,res)
{
    let {token} = req.params;
	let sql = `select * from user where mailToken = ?`;
	let user = await getUserByMailToken(token);
	req.session.user = user[0];
	//console.log(req.session.user,"Session");
	req.session.isLoggedIn=true;
	if(user)
	{	
		let result = await updateVerification(req);
		//let result = await userModel.updateOne({email:user.email},{$set:{isVerified:true}});
		let userAfterUpdate = await getUserUsingSession(req);
		req.session.user = userAfterUpdate[0];
		console.log(req.session.user);
		if(req.session.user.role === "seller")
		{
			res.redirect("/seller");
		}
		else
		{
			res.redirect("/");
		}
	}
}

module.exports = verify_controller;