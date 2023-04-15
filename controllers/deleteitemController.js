// const cartMailElementMatch = require("../services/cartMailElementMatch");
// const cartUpdateItem = require("../services/cartUpdateItem");
const {cartUsingUser,cartMailElementMatch,cartUpdateItem,cartPush,deleteItem} = require("../sqlservices/cartUsingUser");

async function deleteQuan_controller(req,res)
{
    let itemId = parseInt(req.body.prodID);
	let itemExist = await cartMailElementMatch(req.session.user.email,itemId);
	if(itemExist.length)
	{
		// let cartItemarr = itemExist[0].cartItem;
		// let newCartItem = cartItemarr.filter(data=>data.id !== itemId);
		let result = await deleteItem(req.session.user.email,itemId);
		res.json(result);
	}
}

module.exports = deleteQuan_controller;