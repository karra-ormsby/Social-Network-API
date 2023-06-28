const { Schema, Types } = require('mongoose');
const moment = require("moment");

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
            // unique: true
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtFormatter
        },
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

module.exports = reactionSchema;