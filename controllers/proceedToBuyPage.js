module.exports = function(req,res)
{
    res.render("proceed",{username : req.session.user.name})
}