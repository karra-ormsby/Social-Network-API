const { Schema, model } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: { //why does this not have to reference user
            type: String,
            required: true,
            // ref: 'user',
            //not sure is ref to user is needed
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //need a getter method to format the timestamp on query
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// const Reaction = model('reaction', reactionSchema);

// module.exports = Reaction;