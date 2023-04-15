const pool = require("../database/initsql");

module.exports = async function(token)
{

    const[user,fields]= await pool.query('SELECT * FROM `user` WHERE `mailToken` = ?',[`${token}`]);
    return user;
}