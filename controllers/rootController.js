const getProd = require("../sqlservices/getProd");

async function root_controller(req,res){
    let products = await getProd(0,8);
	res.render("root",{products:products,size:"4"});
}

module.exports = root_controller;