const router = require("express").Router();


let Products = require("../models/products.model");


router.get("/", function (req, res) {
    Products.find()
    .then((products)=>{
        res.status(200).json({
            products:products
        })
    })
    .catch((err) => res.status(404).json({
        message:err.message
    }));
});


module.exports = router;
