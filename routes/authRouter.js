const router = require("express").Router();
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const stripe=require('stripe')(keys.stripeSecretKey)
let User = require("../models/user.model");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  //Simple validation
  if (!email || !password)
    return res.status(400).json({ message: "Please enter all fields" });
  //Check for existing User

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ message: `User does not exist` });
console.log(user)
    //Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: `Invalid password` });
      jwt.sign(
        { id: user._id },
        keys.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

router.post("/user", (req, res) => {
  const { name, email, password } = req.body;
  //Simple validation
  if (!name || !email || !password)
    return res.status(400).json({ message: "Please enter all fields" });
  User.findOne({ name }).then((user) => {
    if (user) return res.status(400).json({ message: `Name already exist` });
  });
  //Check for existing User
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ message: `Email already exist` });
  });
  const newUser = new User({
    name,
    email,
    password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;

      newUser.save().then((user) => {
        jwt.sign(
          { id: user.id },
          keys.jwtSecret,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    });
  });
});


router.post("/stripe",  (req, res) => {
  try {
    stripe.oauth.token({
      grant_type: 'authorization_code',
      code: req.body.code,
    }).then(item=>{
      res.status(200).json({item})
      console.log(item)
    }).catch(err=>{
      res.status(500).json({message:err})
    })
  } catch (error) {
    res.status(500).json({error});
  }
});
router.post("/deauthorize",  (req, res) => {
  try {
    console.log(req.body)
    stripe.oauth.deauthorize({
      client_id: req.body.clientId,
      stripe_user_id: req.body.stripeId,
    }).then(item=>{
      res.status(200).json({item})
    }).catch(err=>{
      res.status(500).json({message:err})
    })
  } catch (error) {
    res.status(500).json({error});
  }
});


module.exports = router;
