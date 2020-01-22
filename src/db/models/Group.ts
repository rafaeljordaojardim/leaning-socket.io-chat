const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Group = new Schema({
  room: {
    type: String,
  },
  people: [String],
  // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}); 

const group = mongoose.model('Group', Group);
export default group;