const router = require('express').Router();

const {   
    addFriend,
    deleteFriend
  } = require('../../controllers/friend-controller');



// Set up GET one, PUT, and DELETE at /api/users/:id/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);
  
module.exports = router;