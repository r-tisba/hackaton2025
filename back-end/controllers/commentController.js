const Comment = require('../models/Comment');
const Tweet = require('../models/Tweet');
const User = require('../models/User');

exports.getCommentsByTweetId = async (req, res) => {
  try {
    const comments = await Comment.find({ id_tweet: req.params.tweetId }).populate('id_user', 'pseudo');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  const userId = req.user.id;
  const { contenue } = req.body;
  const { tweetId } = req.params;

  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ message: 'Tweet introuvable' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    const newComment = new Comment({ contenue, id_tweet: tweetId, id_user: userId });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};