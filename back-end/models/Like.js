const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id_tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true }
  }, { timestamps: true });
  module.exports = mongoose.model('Like', likeSchema);