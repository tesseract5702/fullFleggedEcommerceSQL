const pool = require("../database/initsql");

module.exports = async function(prodID)
{
    let del = 0;
    let result = await pool.query(`update products set isAvailable = '${del}' where id = '${prodID}'`);
    return result;
}