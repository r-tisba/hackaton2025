const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id_tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true },
    contenue: { type: String, required: true },
    attachment: { type: String }
  }, { timestamps: true });
  module.exports = mongoose.model('Comment', commentSchema);
  