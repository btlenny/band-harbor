const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bandSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String },
  // Add more fields as needed
});



module.exports = mongoose.model("Band", bandSchema);