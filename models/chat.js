const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  initChat : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  joinerChat: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
})

module.exports = mongoose.model('Chat', chatSchema);
