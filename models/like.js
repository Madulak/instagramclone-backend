const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  likeCreator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Like', likeSchema);
