const pool = require("../database/initsql");

module.exports = async function(mail,prodID,setQuan)
{
    let result = await pool.query(`update cart set cartQuantity = ${setQuan} where userid='${mail}' and productid = ${prodID}`);
    return result;
}