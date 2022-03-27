const { User } = require('../models');

const FriendController = {
    // createUser
    addFriend({ params }, res) {
        console.log('Inside add friend')
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
    },

    // delete User
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => {
                res.json(dbUserData);
            })
    }
}

module.exports = FriendController;
