const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
            //need a getter method to format the timestamp on query
        },
        username: [
            { //the user that created the thought
            type: String,
            // type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
            }
        ],
        reactions: [reactionSchema]
        // reactions: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'reaction'
        //     }
        // ],
        },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;