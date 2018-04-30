const mongoose = require("mongoose");

const { Schema } = mongoose;

module.exports = user = mongoose.model("user", {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    defult: Date.now
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts"
    }
  ]
});

user.getUser = args => {
  const { _id, email } = args;
  if (_id) {
    return user.find({ _id }).populate("posts");
  }
  if (email) {
    return user.find({ email }).populate("posts");
  } else {
    return user.find().populate("posts");
  }
};

user.registerUser = args => {
  const { name, email, password } = args;
  return user.create({
    name,
    email,
    password
  });
};
