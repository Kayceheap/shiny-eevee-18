const { Thought, User } = require('../models');

const ThoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .then(dbUserData => res.json(dbUserData))
    },

    // get one Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbUserData => {
                res.json(dbUserData);
            })
    },

    // createThought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                console.log(body.userId);
                console.log(_id);

                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                ).then(dbUserData => res.json(dbUserData))
                    .catch(err => res.status(401).json(err));
            }).catch(err => res.status(401).json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    // update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                res.json(dbUserData);
            })
    },

    // delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                res.json(dbUserData);
            })
    }
}

module.exports = ThoughtController;
