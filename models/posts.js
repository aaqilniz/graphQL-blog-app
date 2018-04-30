const mongoose = require("mongoose");

let { Schema } = mongoose;

module.exports = post = mongoose.model("posts", {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  createdAt: {
    type: Date,
    defult: Date.now
  }
});
