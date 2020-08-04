const Post = require('../models/post');
const User = require('../models/user');
const Userinfo = require('../models/userinfo');
const Like = require('../models/like');
const Comment = require('../models/comment');


exports.postComment = (req, res, next) => {
  const userId = req.userId;
  const postId = req.params.id;
  const comment = req.body.comment;

  let createComment;
  let post;

  Post.findById(postId)
    .then(postDoc => {
      post = postDoc;
      createComment = new Comment({
        commentText: comment,
        commentCreator: userId
      })
      return createComment.save()
    })
    .then(response => {
      return post.comment.push(createComment);
    })
    .then(result => {
      return post.save();
    })
    .then(results => {
      res.status(200).json({message: 'Comment created ', data: results})
    })
    .catch(err => {
      console.log(err);
    })

}

exports.postAddfollow = (req, res, next) => {
  const user = req.body.user;
  const userId = req.userId;

  let follow;

  User.findById(user)
    .then(userDoc => {
      console.log(userDoc);
      follow = userDoc;
      return userDoc.followers.push(userId);
    })
    .then(response => {
      return follow.save()
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

exports.postLike = (req, res, next) => {
  const postId = req.params.id;
  const userId = req.userId;

  let post;
  let likey;

  Post.findById(postId)
    .populate('like')
    .then(postDoc => {
      // console.log('[PostDoc] ',postDoc.like)
      postDoc.like.map(ig => (console.log(ig.likeCreator)))

      // if(!postDoc) {
      //   likey = new Like({
      //     likeCreator: userId
      //   })
      //   return likey.save()
      //     .then(response => {
      //       return Post.findById(postId)
      //     })
      //     .then(result => {
      //       post = result;
      //       return result.like.push(likey)
      //     })
      //     .then(results => {
      //       return post.save()
      //     })
      //     .then(likeresult => {
      //       console.log('[like result] -- ',likeresult);
      //     })
      //
      // }
    //   if(postDoc) {
    //     const filter = postDoc.like.filter((item) => item._id !== userId)
    //     post = new Post({
    //       like: filter
    //     })
    //     return post.save()
    //       .then(response => {
    //         return Like.deleteOne({likeCreator: userId})
    //       })
    //       .then(result => {
    //         result.save()
    //       })
    //       .then(results => {
    //         console.log(results);
    //       })
    //   }
    })
    .catch(err => {
      console.log(err);
    })

}

exports.postCreatepost = (req, res, next) => {
  const postText = req.body.postText;
  const mediaUrl = req.file.path;
  const postCreator = req.userId;

  console.log('[Post Text] ',postText)
  let user;
  let post;

  User.findById(postCreator)
    .populate({
      path: 'followers',
      populate: {
        path: 'timeline'
      }
    })
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
      return user.timeline.push(post)
    })
    .then(timeline => {
      return user.followers.map(ig => ig.timeline.push(post))
    })
    .then(results => {
      return user.save()
    })
    .then(response => {
      res.status(201).json({message: 'Post created'})
    })
    .catch(err => {
      console.log(err);
    })
}
