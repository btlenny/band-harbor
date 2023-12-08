const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { 
    type: String, 
    required: true 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  userName: String,
});

const bandSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  album: { 
    type: String 
  },
  photoUrl: {  
    type: String, 
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Band", bandSchema);
