
const express = require('express');
const application = express()

const { default: mongoose } = require("mongoose");

const userRoute = require("./routes/routes");
const rootRoute = '/Tutorial7'

mongoose.connect('mongodb+srv://rachithans:sYblKNRXqW6mgO8Q@cluster0.zyq8bot.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true
})
  .then(() => {
    console.log("Connected to the mongoose database!");
  })
  .catch((error) => {
    console.error("Error connecting to mongoose database:", error);
  });

application.use(express.json())

application.use(rootRoute,userRoute)

application.use('/',(req,res) => {
    return res.status(404).json({
        message: "Route not found tetststst",
        success: false,
    })
})

module.exports = application;