const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new ObjectId(),
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
    },

});


// create the Pizza model using the ReactionSchema
const Reaction = model('Reaction', ReactionSchema);

// export the Pizza model
module.exports = Reaction;