const router = require("express").Router();
const keys = require("../config/keys");
const stripe=require('stripe')(keys.stripeSecretKey)

router.post("/", function (req, res) {
 const amount=100*100
  stripe.customers.create({
      email:req.body.data.email,
      source:req.body.data.id,
  }).then(customer=>stripe.charges.create({
    amount,
    description:'Interview Stripe Iphone',
    currency:'usd',
    customer:customer.id
  }))
  .then(charge=>res.json({resultCode:0,message:"Your order succesfully paid"}))
  .catch(err=>res.status(404).json({resultCode:1,message:"Error with buy phone"}))
});




module.exports = router;
