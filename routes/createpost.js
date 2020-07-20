const express = require('express');
const router = express.Router();

const postcontroller = require('../controllers/postcontrollers');
const isAuth = require('../middleware/is-Auth');

router.post('/createpost', isAuth, postcontroller.postCreatepost);

module.exports = router;
