const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  photo: { type: String },
  banniere: { type: String },
  biographie: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);