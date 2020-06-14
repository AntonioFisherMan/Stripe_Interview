const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const keys=require("./config/keys")
require("dotenv").config();

const app = new express();
//BODY-PARSER Middleware

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const db = keys.mongoURI;

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });


const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on ${port}`));
const productsRouter = require("./routes/productsRouter");
app.use("/products", productsRouter);

const paymentRouter = require("./routes/paymentRouter");
app.use("/payment", paymentRouter);

const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);


  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
      app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client','build','index.html'), function(err) {
          if (err) {
            res.status(500).send(err)
          }
        })
      })
}

