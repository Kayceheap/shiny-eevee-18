const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,

        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
    },

    reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the Pizza model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Pizza model
module.exports = Thought;