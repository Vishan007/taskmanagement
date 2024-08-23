const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: String,
    password: String,
    task: [
        { type: Schema.Types.ObjectId, ref: 'task'}
    ]
});

module.exports = mongoose.model('user', UserSchema);