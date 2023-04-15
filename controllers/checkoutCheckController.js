// const cartUsingUser = require("../services/cartUsingUser");
// const cartUpdateItem = require("../services/cartUpdateItem");

// async function checkoutCheck_controller(req,res)
// {
//     let order = req.body.order;
// 	let itemId = req.body.itemID;
// 	let userCart = await cartUsingUser(req.session.user.email);
// 	if(userCart)
// 	{
// 		let cartItemarr = userCart[0].cartItem;
// 		for(let i=0;i<cartItemarr.length;i++)
// 		{
// 			if(cartItemarr[i]._id.valueOf() === itemId)
// 			{
// 				cartItemarr[i].order = order;
// 				break;
// 			}
// 		}
// 		let result = await cartUpdateItem(req.session.user.email,cartItemarr);
// 		res.json(result);
// 	}
// }

// module.exports = checkoutCheck_controller;