const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userinfoSchema = new Schema({
  location: {
    type: String
  },
  hobby: {
    type: String
  },
  phonenumber: {
    type: String
  }
})

module.exports = mongoose.model('Userinfo', userinfoSchema);
