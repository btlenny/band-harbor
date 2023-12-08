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
  photoUrl: {  // Update the field name from imageUrl to photoUrl
    type: String, 
  },
  comments: [commentSchema],

  // Add more fields as needed
});

module.exports = mongoose.model("Band", bandSchema);
