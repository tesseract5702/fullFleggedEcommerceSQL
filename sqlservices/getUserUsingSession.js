const pool = require("../database/initsql");

module.exports = async function(req)
{
    const[user,fields]= await pool.query('SELECT * FROM `user` WHERE `email` = ?',[`${req.session.user.email}`]);
    return user;
}