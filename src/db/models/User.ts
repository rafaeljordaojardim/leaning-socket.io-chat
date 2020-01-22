const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String
  },
  connectionId: String,
  // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}); 

const user = mongoose.model('User', User);
export default user;