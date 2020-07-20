const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilepicSchema = new Schema({
  imageUrl: {
    type: String
  }
})

module.exports = mongoose.model('Profilepic', profilepicSchema);
