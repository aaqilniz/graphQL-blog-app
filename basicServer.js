const express = require('express');

const basicAPI = require('./api/basicAPI');
const userAPI = require('./api/userAPI');

let app = express();

//Basic API
app.use('/graphql/basic', basicAPI);

//User API
app.use('/graphql/user', userAPI);

app.listen(3000, () => {
    console.log('graphql server is up and running.');
});