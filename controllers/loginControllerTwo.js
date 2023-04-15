async function login_controller_two(req,res)
{
    res.render("login",{errorlogin:""});
}

module.exports = login_controller_two;