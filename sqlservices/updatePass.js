const pool = require("../database/initsql");

module.exports = async function(req,newPass)
{
    let setTrue = 1;
    let result = await pool.query(`update user set password = '${newPass}' where email = '${req.session.user.email}'`);
}