const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Query {
        message: String,
        another: String
    }
`);

let root = {
    message: () => {
        return 'hello world!';
    },
    another: () => {
        return 'just a test.'

    }
}

let basic = graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
});

module.exports = basic;