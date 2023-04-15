const userModel = require("../schema/user");
const updatePass = require("../sqlservices/updatePass");

async function changePass_controller(req,res)
{
    let {newPass, newPass1} = req.body;
	if(newPass === newPass1)
	{
		if(newPass !== req.session.user.password)
		{
			//let result = await userModel.updateOne({email:req.session.user.email},{$set:{password:newPass}});
			let result = await updatePass(req,newPass);
			res.redirect("/")
		}
		else
		{
			res.render("reset",{errorlogin:"Enter different Password",username:req.session.user.name});
		}	
	}
	else{
		res.render("reset",{errorlogin:"Password Doesn't Match:",username:req.session.user.name});
	}
}

module.exports = changePass_controller;