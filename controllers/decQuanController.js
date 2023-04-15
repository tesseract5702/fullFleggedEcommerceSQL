// const cartMailElementMatch = require("../services/cartMailElementMatch");
// const cartUpdateItem = require("../services/cartUpdateItem");
const {cartUsingUser,cartMailElementMatch,cartUpdateItem,cartPush,deleteItem} = require("../sqlservices/cartUsingUser");
const pool = require("../database/initsql");

async function decQuan_controller(req,res)
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
		// 		if(cartItemarr[i].cartQuantity>1)
		// 		{
		// 			cartItemarr[i].cartQuantity--;
		// 		}
		// 		break;
		// 	}
		// }
		if(itemExist[0].cartQuantity>1)
		{
			let result = await cartUpdateItem(0,req.session.user.email,itemId);
			res.json({"status" : 1});
		}
		else
		{
			res.json({"status" : 0});
		}
	}
}

module.exports = decQuan_controller;