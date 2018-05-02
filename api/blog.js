const graphHTTP = require("express-graphql");

const db = require("../config/db.config");
const user = require("../models/user");
const posts = require("../models/posts");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const Post = new GraphQLObjectType({
  name: "Post",
  args: {
    title: {
      type: GraphQLString
    }
  },
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: (root, args, context, info) => {
        console.log(root);
        console.log(root.title);
        return root.title;
      }
    },
    content: {
      type: GraphQLString,
      resolve: (root, args, context, info) => {
        return root.content;
      }
    },
    author: {
      type: GraphQLString,
      resolve: (root, args, context, info) => {
        return root.author;
      }
    },
    _id: {
      type: GraphQLString,
      resolve: (root, args, context, info) => {
        return root._id;
      }
    }
  })
});

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: (root, args, context, info) => {
        return root._id;
      }
    },
    name: {
      type: GraphQLString,
      resolve: (root, args, context, info) => {
        return root.name;
      }
    },
    email: {
      type: GraphQLString,
      resolve: (root, args, context, info) => {
        return root.email;
      }
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: (root, args, context, info) => {
        return root.posts;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    args: {
      _id: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      }
    },
    fields: () => ({
      users: {
        type: new GraphQLList(User),
        resolve: async (root, args, context, info) => {
          console.log(context);
          return await user
            .getUser(args)
            .then(result => {
              return result;
            })
            .catch(err => {
              return [err];
            });
        }
      }
    })
  }),

  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      registerUser: {
        type: User,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, args, context, info) => {
          return user
            .registerUser(args)
            .then(result => {
              return result;
            })
            .catch(err => {
              return err;
            });
        }
      }
    })
  })
});

let userAPI = graphHTTP({
  schema,
  graphiql: true
});

module.exports = userAPI;
