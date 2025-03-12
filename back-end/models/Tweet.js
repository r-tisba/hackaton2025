const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contenue: { type: String, required: true },
    attachment: { type: String },
    angry: { type: Number, default: 0 },
    disgust: { type: Number, default: 0 },
    fear: { type: Number, default: 0 },
    happy: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    sad: { type: Number, default: 0 },
    surprise: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Tweet', tweetSchema);