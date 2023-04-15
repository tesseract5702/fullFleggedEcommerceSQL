function checkAuth(req, res, next)
{
  //console.log(req.session,"checkauth");
  if(req.session.isLoggedIn && req.session.user.isVerified)
  {
    next();
    return
  }
  else if(req.session.isLoggedIn && !req.session.user.isVerified)
  {
    res.render("notVerified");
    return
  }
  res.redirect("/root");
}
module.exports = checkAuth;