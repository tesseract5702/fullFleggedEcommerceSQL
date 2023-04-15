const {cartUsingUser,cartMailElementMatch,cartUpdateItem,cartPush,deleteItem} = require("../sqlservices/cartUsingUser");
const updateCartQuantity = require("../sqlservices/updateCartQuantity");

async function checkout_controller(req,res)
{
    let userCart = await cartUsingUser(req.session.user.email);
	//console.log(userCart[0]);
	let totalAmt = 0;
	if(userCart.length)
	{
		// userCart[0].cartItem.forEach((item)=>{
		// 	if(item.order)
		// 	{
		// 		totalAmt+=item.price*item.cartQuantity;
		// 	}
		// })
		userCart.forEach(async(item)=>{
			if(item.cartQuantity > item.quantity)
			{	
				item.inStock = false;
			}
			else{
				item.inStock = true;
				totalAmt+=item.price*item.cartQuantity;
			}
		})
		res.render("checkout",{username:req.session.user.name,cartItems:userCart,total:totalAmt})
	}
	else{
		res.redirect("/");
	}
}

module.exports = checkout_controller;