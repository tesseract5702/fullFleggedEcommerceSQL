function resetPass_controller(req,res)
{
    if(req.session.isLoggedIn && req.session.user.isVerified)
	{
		res.render("reset",{errorlogin:"",username:req.session.user.name});
	}
	else
    {
		res.redirect("/");
	}
}

module.exports = resetPass_controller;