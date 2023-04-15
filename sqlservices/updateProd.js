const pool = require("../database/initsql");

module.exports = async function(prodDetail)
{
    let {productID,productName,productDescription,productPrice,productQuantity} = prodDetail;
    let result = await pool.query(`update products set name = '${productName}',quantity='${productQuantity}',price='${productPrice}',details='${productDescription}' where id = '${productID}'`);
    return result;
}