// const cartUsingUser = require("../services/cartUsingUser");
// const cartUpdateItem = require("../services/cartUpdateItem");
const {cartUsingUser,cartMailElementMatch,cartUpdateItem,cartPush,deleteItem} = require("../sqlservices/cartUsingUser");
//const getCompleteProd = require("../services/getCompleteProd");
const getCartItem = require("../sqlservices/getCartItems");

async function openCart_controller(req,res)
{
    let userCart = await cartUsingUser(req.session.user.email);
	//let products = await getCompleteProd();
	//let cartItemarr=[];
	if(userCart.length)
	{
		//  userCart[0].cartItem.forEach((item)=>{
		// 	for(let i=0;i<products.length;i++)
		// 	{
		// 		if(products[i]._id.valueOf() == item._id.valueOf())
		// 		{
		// 			item.name = products[i].name;
		// 			item.price = products[i].price;
		// 			item.details = products[i].details;
		// 			cartItemarr.push(item);
		// 			break;
		// 		}
		// 	}
		// })
		//let result = await cartUpdateItem(req.session.user.email,cartItemarr);
		let cartItemarr = await getCartItem(req.session.user.email);
		res.render("cart",{username:req.session.user.name,cartItems:cartItemarr});
	}
	else
	{
		res.render("cart",{username:req.session.user.username,cartItems:[]});
	}
}

module.exports = openCart_controller;