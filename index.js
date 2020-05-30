const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
//Routers
const auth = require("./routes/auth");
const privateRoute = require("./routes/private");

//Middlewares
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/assets"));

//Routes
app.use("/auth", auth);
app.use("/posts", privateRoute);
require("dotenv").config();

//DB Connect
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.error(err);
    else console.log("Connected with DB");
  }
);

app.listen(process.env.PORT, () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
