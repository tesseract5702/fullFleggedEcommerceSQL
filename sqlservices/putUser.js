const pool = require("../database/initsql");

module.exports = async function(req)
{
    let isVerified = 0;
    let mailToken = Math.floor(Math.random()*1000000);
    let sql = `INSERT INTO user(email, password, name, role,isVerified,isVerifiedForget, mailToken) VALUES('${req.body.mail}','${req.body.password}','${req.body.username}','${req.body.radio}','${isVerified}','${isVerified}','${mailToken}')`;
    let result = await pool.query(sql);
}