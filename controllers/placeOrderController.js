const transactionCod = require("../sqlservices/transactionCod");
const {cartUsingUser,cartMailElementMatch,cartUpdateItem,cartPush,deleteItem} = require("../sqlservices/cartUsingUser");

module.exports = async function(req,res)
{
    let cart = await cartUsingUser(req.session.user.email);
    //console.log(req.body,"placeordercod")
    if(cart.length>0)
    {
        let totalAmt=0;
        cart.forEach(item => {
          if(item.cartQuantity > item.quantity)
          {	
            item.inStock = false;
          }
          else{
            item.inStock = true;
            totalAmt+=item.price*item.cartQuantity;
          }
        });
        transactionCod(req,cart,totalAmt,'online',function(status,products){ 
            res.json({status:'success'});
        })
    }
    else
    {
        res.json({status:'failed'});
    }
}