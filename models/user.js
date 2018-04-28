const mongoose = require('mongoose');

let { Schema } = mongoose;

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }]
}); 

module.exports = mongoose.model('user', userSchema);