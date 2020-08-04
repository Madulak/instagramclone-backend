const express = require('express');
const router = express.Router();

const postcontroller = require('../controllers/postcontroller');
const isAuth = require('../middleware/is-Auth');

router.post('/createpost', isAuth, postcontroller.postCreatepost);

router.post('/like/:id', isAuth, postcontroller.postLike);

router.post('/comment/:id', isAuth, postcontroller.postComment);

module.exports = router;
