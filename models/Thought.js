const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require("moment");

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtFormatter
        },
        username: {
            type: String,
            required: true,
            ref: 'user',
            },
        reactions: [reactionSchema]
        },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

function createdAtFormatter(date) {
    return moment(date).format('MMMM Do YYYY, h:mm a')
};


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;