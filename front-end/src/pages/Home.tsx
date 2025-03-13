import React, { useEffect, useState, useRef } from 'react';
import { TweetComposer } from '../components/tweet/TweetComposer';
import { TweetCard } from '../components/tweet/TweetCard';
import axios from 'axios';

export function Home() {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // État pour forcer un re-render
  const [emotions, setEmotions] = useState(null); // État pour stocker les émotions

  const tweetRefs = useRef([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const fetchTweets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tweets");
      setTweets(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tweets:", error);
    }
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tweets");
        setTweets(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interactions/mylikes", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLikes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des likes:", error);
      }
    };

    const fetchRetweets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interactions/myretweets", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRetweets(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des retweets:", error);
      }
    };

    const fetchBookmarks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interactions/mysignets", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBookmarks(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des signets:", error);
      }
    };

    const fetchEmotions = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/model/predict', {
          userId: user._id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmotions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des émotions:', error);
      }
    };

    fetchTweets();
    fetchUsers();
    fetchLikes();
    fetchRetweets();
    fetchBookmarks();
    fetchEmotions(); // Appel de l'API pour récupérer les émotions
  }, [refreshTrigger, user._id, token]);

  const handleLike = async (tweetId) => {
    try {
      const likedTweet = likes.find(like => like.id_tweet === tweetId);
      if (likedTweet) {
        await axios.delete(`http://localhost:5000/api/interactions/like/${likedTweet._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLikes(likes.filter(like => like.id_tweet !== tweetId));
      } else {
        const response = await axios.post(`http://localhost:5000/api/interactions/like/${tweetId}`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLikes([...likes, response.data]);
      }
      setTweets(tweets.map(tweet => tweet._id === tweetId ? { ...tweet, isLiked: !tweet.isLiked } : tweet));
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleRetweet = async (tweetId) => {
    try {
      const retweetedTweet = retweets.find(retweet => retweet.id_tweet === tweetId);
      if (retweetedTweet) {
        await axios.delete(`http://localhost:5000/api/interactions/retweet/${retweetedTweet._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRetweets(retweets.filter(retweet => retweet.id_tweet !== tweetId));
      } else {
        const response = await axios.post(`http://localhost:5000/api/interactions/retweet/${tweetId}`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRetweets([...retweets, response.data]);
      }
      setTweets(tweets.map(tweet => tweet._id === tweetId ? { ...tweet, isRetweeted: !tweet.isRetweeted } : tweet));
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erreur lors du retweet:', error);
    }
  };

  const handleBookmark = async (tweetId) => {
    try {
      const bookmarkedTweet = bookmarks.find(bookmark => bookmark.id_tweet === tweetId);
      if (bookmarkedTweet) {
        await axios.delete(`http://localhost:5000/api/interactions/signet/${bookmarkedTweet._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBookmarks(bookmarks.filter(bookmark => bookmark.id_tweet !== tweetId));
      } else {
        const response = await axios.post(`http://localhost:5000/api/interactions/signet/${tweetId}`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBookmarks([...bookmarks, response.data]);
      }
      setTweets(tweets.map(tweet => tweet._id === tweetId ? { ...tweet, isBookmarked: !tweet.isBookmarked } : tweet));
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erreur lors du signet:', error);
    }
  };

  // Fonction pour gérer la détection d'élément visible et centré
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      const rect = entry.target.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculer si l'élément est dans la plage centrale (par exemple entre 40% et 60% du viewport)
      const isCentered = rect.top >= windowHeight * 0.4 && rect.bottom <= windowHeight * 0.6;

      if (entry.isIntersecting && isCentered) {
        // Quand l'article est centré et dans la fenêtre
        console.log('Article:', entry.target.dataset.tweetId);  // Affiche l'ID du tweet
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Utiliser la fenêtre du navigateur comme racine
      threshold: 0, // On veut détecter dès que l'élément touche le viewport
    });

    // Observer chaque élément de la liste des tweets
    tweetRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Clean up l'observer lors du démontage du composant
    return () => {
      tweetRefs.current.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [tweets]);  // Réexécuter quand les tweets changent

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
          <h1 className="text-xl font-bold">Home</h1>
        </header>

        <TweetComposer onTweetAdded={fetchTweets} />

        <div className="divide-y divide-gray-200">
          {tweets.map((tweet, index) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}
              className="tweet-card"
              onLike={() => handleLike(tweet._id)}
              onRetweet={() => handleRetweet(tweet._id)}
              onReply={() => {}}
              onBookmark={() => handleBookmark(tweet._id)}
              data-tweet-id={tweet._id}  // Ajout de l'ID du tweet comme donnée d'ancrage
              ref={(el) => tweetRefs.current[index] = el} // Référence pour chaque élément
              isLiked={likes.some(like => like.id_tweet === tweet._id)} // Vérifier si le tweet est liké
              isRetweeted={retweets.some(retweet => retweet.id_tweet === tweet._id)} // Vérifier si le tweet est retweeté
              isBookmarked={bookmarks.some(bookmark => bookmark.id_tweet === tweet._id)} // Vérifier si le tweet est bookmarké
            />
          ))}
        </div>
      </div>

      <div className="hidden lg:block fixed right-0 w-80 p-4 h-full overflow-y-auto">
        {/* Sidebar */}
      </div>
    </div>
  );
}