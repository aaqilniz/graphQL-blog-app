const graphHTTP = require("express-graphql");

const { buildSchema } = require("graphql");

const db = require("../config/db.config");

const user = require("../models/user");

const posts = require("../models/posts");

let schema = buildSchema(`
    type Query {
        users: [User]
    },
    type User {
        name: String,
        email: String,
        posts: [Post]
    },
    type Post {
        title: String,
        content: String
    }
`);

let root = {
  users: () => {
    return user
      .find()
      .populate('posts')
      .select({ _id: 0 })
      .then(res => {
        return res;
      });
  }
};

let userAPI = graphHTTP({
  schema,
  rootValue: root,
  graphiql: true
});

module.exports = userAPI;
