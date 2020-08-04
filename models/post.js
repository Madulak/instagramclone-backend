const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postText: {
    type: String
  },
  mediaUrl: {
    type: String
  },
  postCreator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  }],
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'Like'
  }]
},{timestamps: true})

module.exports = mongoose.model('Post', postSchema);
