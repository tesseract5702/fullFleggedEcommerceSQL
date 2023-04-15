const pool = require("../database/initsql");

module.exports = async function(req)
{
    let setTrue = 1;
    let result = await pool.query(`update user set isVerified = '${setTrue}' where email = '${req.session.user.email}'`);
}