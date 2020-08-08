const Post = require('../models/post');
const User = require('../models/user');
const Userinfo = require('../models/userinfo');
const Like = require('../models/like');

exports.getUserinfo = (req, res, next) => {
  const username = req.params.id;
  console.log('[UserName] ', username);

  User.findOne({username: username})
    .populate({path: 'myposts', options: {sort: {'createdAt': -1}}})
    .then(userDoc => {
      res.status(200).json({data: userDoc});
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getTimeline = (req, res, next) => {
  const userId = req.params.id;

  User.findOne({username: userId})
    .populate({path: 'timeline',  populate: {path: 'postCreator'}, options: {sort: {'createdAt': -1}}})
    .then(userDoc => {
      res.status(200).json({data: userDoc.timeline})
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getSinglepost = (req, res, next) => {
  const postId = req.params.id;

  Post.findById(postId)
    .populate('postCreator')
    .populate({path: 'comment', populate: {path: 'commentCreator'}})
    .populate('like')
    .then(postDoc => {
      res.status(200).json({data: postDoc})
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getAllPosts = (req, res, next) => {

  Post.find()
    .sort({createdAt: -1})
    .then(postDoc => {
      res.status(200).json({data: postDoc})
    })
    .catch(err => {
      console.log(err);
    });
}
