//const getProdLimit = require("../services/getProdLimit");
const getProd = require("../sqlservices/getProd");
//const getProdSort = require("../services/getProdSort");
const addProd = require("../sqlservices/addProd");
const multer  = require('multer')
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + path.extname(file.originalname))
	}
})
const path  = require('path')
const upload = multer({storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      },
    limits: { fileSize: 300000}
})

async function addProd_controller(req,res)
{
    if(req.session.user.role === "admin" || req.session.user.role === "seller")
	{
		upload.single("prodImage")(req,res,async(err)=>{
			if(err)
			{
				let products = await getProd(0,8);
				if(req.session.user.role === "admin")
				{
					res.render("admin",{username:req.session.user.username,products:products,size:"4",err:err});
					return
				}
				else
				{
					res.render("seller",{username:req.session.user.username,products:products,size:"4",err:err});
					return
				}
			}
			// let productArr = await getProdSort(1);
			// let id = productArr[0].id;
			// id++;
			addProd(req);
			if(req.session.user.role === "seller")
			{
				res.redirect("/seller");
			}
			else
			{
				res.redirect("/admin")
			}
		})
	}
	else{
		res.redirect("/");
	}
}

module.exports = addProd_controller;