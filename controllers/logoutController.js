function logout_controller(req,res)
{
    req.session.isLoggedIn=false;
	res.redirect("/root");
}

module.exports = logout_controller;