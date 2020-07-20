const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  myposts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  userinfo: {
    type: Schema.Types.ObjectId,
    ref: 'Userinfo'
  },
  timeline: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

module.exports = mongoose.model('User', userSchema);
