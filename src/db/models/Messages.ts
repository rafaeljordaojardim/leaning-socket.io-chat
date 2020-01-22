const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Messages = new Schema({
  owner: {
    type: String
  },
  message: {
    type: String,
  },
}); 

const messages = mongoose.model('Messages', Messages);
export default messages;