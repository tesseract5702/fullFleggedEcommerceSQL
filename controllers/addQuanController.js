// const cartMailElementMatch = require("../services/cartMailElementMatch");
// const cartUpdateItem = require("../services/cartUpdateItem");
const {cartUsingUser,cartMailElementMatch,cartUpdateItem,cartPush,deleteItem} = require("../sqlservices/cartUsingUser");

async function addQuan_controller(req,res)
{
    let itemId = parseInt(req.body.prodID);
	let itemExist = await cartMailElementMatch(req.session.user.email,itemId);
	if(itemExist.length)
	{
		// let cartItemarr = itemExist[0].cartItem;
		// for(let i=0;i<cartItemarr.length;i++)
		// {
		// 	if(cartItemarr[i].id === itemId)
		// 	{
		// 		if(cartItemarr[i].cartQuantity<cartItemarr[i].quantity)
		// 		{
		// 			cartItemarr[i].cartQuantity++;
		// 		}
		// 		break;
		// 	}
		// }
		if(itemExist[0].cartQuantity<itemExist[0].quantity)
		{	
			let result = await cartUpdateItem(1,req.session.user.email,itemId);
			res.json({"status" : 1});
		}
		else
		{
			res.json({"status" : 0});
		}
    }
}

module.exports = addQuan_controller;