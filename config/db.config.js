const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connection.close();

mongoose
  .connect("mongodb://localhost:27017/api")
  .then(success => {
    console.log("mongoDB connection establishd successfully.");
  })
  .catch(err => {
    console.log("failed to connect to mongoDB server.");
  });

// When the connection is disconnected
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});


// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

module.exports = mongoose;
