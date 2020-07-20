const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentText: {
    type: String
  },
  commentCreator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps})

module.exports = mongoose.model('Comment', commentSchema);
