const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageText: {
    type: String
  },
  mediaUrl: {
    type: String
  },
  messageFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messageTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps})

module.exports = mongoose.model('Message', messageSchema);
