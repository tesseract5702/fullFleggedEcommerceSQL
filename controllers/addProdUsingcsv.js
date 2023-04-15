const fs = require("fs");
const csv = require('csv-parser')
const getProd = require("../sqlservices/getProd");
const addProdcsv = require("../sqlservices/addProdcsv");

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
        if (file.mimetype == "text/csv") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .csv files are allowed!'));
        }
      }
})

async function addProdcsv_controller(req,res)
{
    if(req.session.isLoggedIn)
    {
        if(req.session.user.role === "seller")
        {
            upload.single("csvFile")(req,res,async(err)=>{
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
                //addProd(req);
                const results = [];

                fs.createReadStream("uploads/"+req.file.filename)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async() => {
                    for(let i=0;i<results.length;i++)
                    {
                        let result = await addProdcsv(req.session.user.email,results[i]);
                    }
                    
                });
                
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
    else
    {
        res.redirect("/");
    }
}

module.exports = {addProdcsv_controller};