const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  photo: { type: String, default: "https://picsum.photos/199" },
  banniere: { type: String },
  biographie: { type: String },
  angry: { type: Number, default: 0 },
  disgust: { type: Number, default: 0 },
  fear: { type: Number, default: 0 },
  happy: { type: Number, default: 0 },
  neutral: { type: Number, default: 0 },
  sad: { type: Number, default: 0 },
  surprise: { type: Number, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);