const express = require("express");
const mongoose = require("mongoose");
//Routers
const auth = require("./routes/auth");

//Middlewares
const app = express();
app.use(express.json());

//Routes
app.use("/auth", auth);
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
