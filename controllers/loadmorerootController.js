const getProd = require("../sqlservices/getProd");
const { json } = require('express');

async function loadmoreroot_controller(req,res)
{
    let page = parseInt(req.body.page);
	let products = 8;
	let arr = await getProd(page,products);
	res.json(JSON.stringify(arr));
}

module.exports = loadmoreroot_controller;