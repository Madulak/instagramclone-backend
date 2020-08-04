const express = require('express');
const router = express.Router();

const getcontroller = require('../controllers/getcontrollers');

router.get('/user/:id', getcontroller.getUserinfo);

router.get('/post/:id', getcontroller.getSinglepost);

router.get('/timeline/:id', getcontroller.getTimeline);

router.get('/explore', getcontroller.getAllPosts);

module.exports = router;
