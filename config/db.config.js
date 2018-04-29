const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/api")
  .then(success => {
    console.log("mongoDB connection establishd successfully.");
  })
  .catch(err => {
    console.log("failed to connect to mongoDB server.");
  });

module.exports = mongoose;
