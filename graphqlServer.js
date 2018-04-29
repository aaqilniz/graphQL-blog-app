const express = require('express');

const basicAPI = require('./api/basic');
const blogAPI = require('./api/blog');

let app = express();

//Basic API
app.use('/graphql/basic', basicAPI);

//User API
app.use('/graphql/user', blogAPI);

app.listen(3000, () => {
    console.log('graphql server is up and running.');
});