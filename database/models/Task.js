const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    description : String,
    status : {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
    },
    dueDate : Date,
    recurrence: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', null],
        default: null
    },
    user: { type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports =  mongoose.model('task', TaskSchema);