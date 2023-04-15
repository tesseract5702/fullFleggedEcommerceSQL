const express = require('express');
const session = require("express-session");
const utf8 = require("utf8");
//const initDb = require("./database/init");
const initsql = require("./database/initsql");
const Razorpay = require("razorpay");
const cors = require("cors");
const {cartUsingUser,cartMailElementMatch,cartUpdateItem,cartPush,deleteItem}=require("./sqlservices/cartUsingUser");
const app = express()
const port = 3000

app.use(express.static("uploads"));
app.use("/seller",express.static('uploads'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
const instance = new Razorpay({
  key_id: 'rzp_test_WU6ExvPW3260n1',
  key_secret: 'spYe2GSy71pLaycR9goaqNzv',
});


//initDb();

//Importing routes
const homeRouter = require("./routes/home");
const rootRouter = require("./routes/root");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const adduserRouter = require("./routes/adduser");
const verifyRouter = require("./routes/verify");
const verifyForgetRouter = require("./routes/verifyForget");
const resetPassRouter = require("./routes/resetPass");
const forgetPassRouter = require("./routes/forgetPass");
const forgetSubmitRouter = require("./routes/forgetSubmit");
const adminRouter = require("./routes/admin");
const sellerRouter = require("./routes/seller");
const allRouter = require("./routes/all");

//Routing
app.use("/", homeRouter);
app.use("/root",rootRouter);
app.use("/login",loginRouter);
app.use("/logout",logoutRouter); 
app.use("/addUser",adduserRouter);
app.use("/verify",verifyRouter);
app.use("/verifyToken",verifyForgetRouter);
app.use("/resetPass",resetPassRouter);
app.use("/forgetPass",forgetPassRouter);
app.use("/forgetSubmit",forgetSubmitRouter);
app.use("/admin",adminRouter);
app.use("/seller",sellerRouter);
app.use("*",allRouter);
app.post("/placeorder",async function(req,res){
  let {amount} = req.body;
  // var options = {
  //   amount: amount*100,  // amount in the smallest currency unit
  //   currency: "INR",
  //   receipt: "order_rcptid_11"
  // };
  let cart = await cartUsingUser(req.session.user.email);
  let totalAmt=0;
    //console.log(req.body,"placeordercod")
    if(cart.length>0)
    {
        cart.forEach(item => {
          if(item.cartQuantity > item.quantity)
          {	
            item.inStock = false;
          }
          else
          {
            item.inStock = true;
            totalAmt+=item.price*item.cartQuantity;
          }
        });
    }
  let order = await instance.orders.create({
    amount:totalAmt*100,
    currency: "INR",
    receipt:"order_rcptid_11"
  });
  res.status(201).json({
      success : true,
      order,
      amount
    }
  )
})

app.post("/api/payment/verify",(req,res)=>{
  console.log(req.body.razorpay_order_id);
  let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
 
   var crypto = require("crypto");
   var expectedSignature = crypto.createHmac('sha256', 'spYe2GSy71pLaycR9goaqNzv')
                                   .update(body.toString())
                                   .digest('hex');
                                   console.log("sig received " ,req.body.razorpay_signature);
                                   console.log("sig generated " ,expectedSignature);
   let response = {"signatureIsValid":"false"}
   if(expectedSignature === req.body.razorpay_signature)
   {
     response={"signatureIsValid":"true"}
   }


    res.send(response);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})