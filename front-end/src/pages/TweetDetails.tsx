import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TweetCard } from '../components/tweet/TweetCard';
import { Button } from '../components/ui/Button';

export function TweetDetails() {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
        setTweet(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du tweet:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/comments/${tweetId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interactions/mylikes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLikes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des likes:", error);
      }
    };

    const fetchRetweets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interactions/myretweets", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRetweets(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des retweets:", error);
      }
    };

    const fetchBookmarks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interactions/mysignets", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookmarks(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des signets:", error);
      }
    };

    fetchTweet();
    fetchComments();
    fetchLikes();
    fetchRetweets();
    fetchBookmarks();
  }, [tweetId, token]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/comments/${tweetId}`, {
        content: newComment,
        userId: user._id,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const likedTweet = likes.find(like => like.id_tweet === tweetId);
      if (likedTweet) {
        await axios.delete(`http://localhost:5000/api/interactions/like/${likedTweet._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLikes(likes.filter(like => like.id_tweet !== tweetId));
      } else {
        const response = await axios.post(`http://localhost:5000/api/interactions/like/${tweetId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLikes([...likes, response.data]);
      }
      setTweet({ ...tweet, isLiked: !tweet.isLiked });
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleRetweet = async (tweetId) => {
    try {
      const retweetedTweet = retweets.find(retweet => retweet.id_tweet === tweetId);
      if (retweetedTweet) {
        await axios.delete(`http://localhost:5000/api/interactions/retweet/${retweetedTweet._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRetweets(retweets.filter(retweet => retweet.id_tweet !== tweetId));
      } else {
        const response = await axios.post(`http://localhost:5000/api/interactions/retweet/${tweetId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRetweets([...retweets, response.data]);
      }
      setTweet({ ...tweet, isRetweeted: !tweet.isRetweeted });
    } catch (error) {
      console.error('Erreur lors du retweet:', error);
    }
  };

  const handleBookmark = async (tweetId) => {
    try {
      const bookmarkedTweet = bookmarks.find(bookmark => bookmark.id_tweet === tweetId);
      if (bookmarkedTweet) {
        await axios.delete(`http://localhost:5000/api/interactions/signet/${bookmarkedTweet._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookmarks(bookmarks.filter(bookmark => bookmark.id_tweet !== tweetId));
      } else {
        const response = await axios.post(`http://localhost:5000/api/interactions/signet/${tweetId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookmarks([...bookmarks, response.data]);
      }
      setTweet({ ...tweet, isBookmarked: !tweet.isBookmarked });
    } catch (error) {
      console.error('Erreur lors du signet:', error);
    }
  };

  if (!tweet) return <div>Loading...</div>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <TweetCard
          tweet={tweet}
          onLike={() => handleLike(tweet._id)}
          onRetweet={() => handleRetweet(tweet._id)}
          onReply={() => {}}
          onBookmark={() => handleBookmark(tweet._id)}
          isLiked={likes.some(like => like.id_tweet === tweet._id)}
          isRetweeted={retweets.some(retweet => retweet.id_tweet === tweet._id)}
          isBookmarked={bookmarks.some(bookmark => bookmark.id_tweet === tweet._id)}
        />
        <div className="mt-4">
          <h2 className="text-xl font-bold">Commentaires</h2>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full resize-none border-0 bg-transparent text-xl placeholder-gray-500 focus:outline-none"
              rows={3}
            />
            <Button type="submit" disabled={!newComment.trim()} className="mt-2">
              Commenter
            </Button>
          </form>
          <div className="mt-4 divide-y divide-gray-200">
            {comments.map((comment) => (
              <div key={comment._id} className="py-4">
                <p className="text-gray-900">{comment.content}</p>
                <p className="text-gray-500 text-sm">@{comment.user.pseudo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}