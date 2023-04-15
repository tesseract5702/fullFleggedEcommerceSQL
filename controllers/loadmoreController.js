const getProd = require("../sqlservices/getProd");
const getProdSeller = require("../sqlservices/getProdSeller")
const { json } = require('express');

async function loadmore_controller(req,res)
{
	let page = parseInt(req.body.page);
	let products = 8;
	let arr = await getProd(page,products);
	//console.log(arr,"loadmorecontroller")
	res.json(JSON.stringify(arr));
}

async function loadmoreseller_controller(req,res)
{
	let page = parseInt(req.body.page);
	let products = 8;
	let arr = await getProdSeller(page,products,req);
	//console.log(arr,"loadmoreSeller");
	res.json(JSON.stringify(arr));
}

module.exports= {loadmore_controller,loadmoreseller_controller};