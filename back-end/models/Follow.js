
const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id_followe: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true });
  module.exports = mongoose.model('Follow', followSchema);
  