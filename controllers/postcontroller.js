const Post = require('../models/post');
const User = require('../models/user');
const Userinfo = require('../models/userinfo');

exports.getUserinfo = (req, res, next) => {
  const username = req.params.id;
  console.log('[UserName] ', username);

  User.findOne({username: username})
    .then(userDoc => {
      console.log(userDoc);
      res.status(200).json({data: userDoc});
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postAddfollow = (req, res, next) => {
  const user = req.body.user;
  const userId = req.userId;

  User.findById(user)
    .then(userDoc => {
      console.log(userDoc);
      const follow = userDoc.followers.push(userId);
      return follow.save();
    })
    .then(result => {
      res.status(200).json({message: 'Success'})
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postRemovefollow = (req, res, next) => {
  const user = req.body.user;
  const userId = req.userId;

  User.findById(user)
    .then(userDoc => {
      userDoc.followers.filter((item) => {})      /////////Please finish this
    })
}

exports.postCreatestatus = (req, res, next) => {
  const location = req.body.location;
  const hobby = req.body.hobby;
  const phonenumber = req.body.phonenumber;

  const userId = req.userId;
  let user;
  let status;

  User.findById(userId)
    .then(userDoc => {
      user = userDoc;
       status = new Userinfo({
        location: location,
        hobby: hobby,
        phonenumber: phonenumber
      })
      return status.save()
    })
    .then(result => {
      return user.userinfo.push(status)
    })
    .then(response => {
      res.status(201).json({message: 'success'})
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postCreatepost = (req, res, next) => {
  const postText = req.body.postText;
  const mediaUrl = req.file.path;
  const postCreator = req.user;

  let user;
  let post;

  User.findById(postCreator)
    .then(userDoc => {
      user = userDoc;
      post = new Post({
        postText: postText,
        mediaUrl: mediaUrl,
        postCreator: postCreator
      })
      return post.save()
    })
    .then(result => {
      return user.myposts.push(post)
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    })
}
