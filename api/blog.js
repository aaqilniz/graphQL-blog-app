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

// const schema = new GraphQLSchema({
//   // Browse: http://localhost:3000/graphql?query={counter,message}
//   query: new GraphQLObjectType({
//     name: "Query",
//     fields: () => ({
//       counter: {
//         type: GraphQLInt,
//         resolve: () => counter
//       },
//       message: {
//         type: GraphQLString,
//         resolve: () => "Salem"
//       }
//     })
//   }),
//   mutiation: new GraphQLObjectType({
//     name: "Mutation",
//     fields: () => ({
//       incrementCounter: {
//         type: GraphQLInt,
//         resolve: () => ++counter
//       }
//     })
//   })
// });

const Post = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    },
    _id: {
      type: GraphQLString
    }
  })
});

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    posts: {
      type: new GraphQLList(Post)
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
        resolve: async (parentValues, args) => {
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
        resolve: (parentValues, args) => {
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
