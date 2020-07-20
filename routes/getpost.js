const express = require('express');
const router = express.Router();

const postcontroller = require('../controllers/postcontroller');

router.get('/');

router.get('/:id', postcontroller.getUserinfo);

module.exports = router;
