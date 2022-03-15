const router = require('express').Router();

const userRoutes = require('./user-routes');
const friendRoutes = require('./friend-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/users', userRoutes);
router.use('/users', friendRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
