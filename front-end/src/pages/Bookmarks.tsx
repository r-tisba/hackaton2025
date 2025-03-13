import { useEffect, useState } from 'react';
import { TweetCard } from '../components/tweet/TweetCard';
import axios from 'axios';
import { Search } from 'lucide-react';

export function Bookmarks() {
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interactions/mysignets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookmarkedTweets(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des signets:', error);
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

    fetchUsers();
    fetchLikes();
    fetchRetweets();

    if (user && token) {
      fetchBookmarks();
    }
  }, [user, token]);

  return (
    <div className="flex justify-center">
      {/* Contenu principal (scrollable) */}
      <div className="w-full max-w-2xl overflow-y-auto">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
          <h1 className="text-xl font-bold">Bookmarks</h1>
        </header>

        {bookmarkedTweets.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {bookmarkedTweets.map((tweet) => (
              <TweetCard
                key={tweet._id}
                tweet={tweet}
                onLike={() => {}}
                onRetweet={() => {}}
                onReply={() => {}}
                onBookmark={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-2xl font-bold">Save Tweets for later</h2>
            <p className="mt-2 text-gray-600">
              Don't let the good ones fly away! Bookmark Tweets to easily find them
              again in the future.
            </p>
          </div>
        )}
      </div>

      {/* Sidebar FIXE */}
      <div className="hidden lg:flex flex-col fixed right-0 top-0 w-80 h-screen bg-white border-l border-gray-200 p-4">
        <div className="overflow-y-auto h-full">
          <div className="rounded-full bg-gray-100 p-3 mb-4">
            <div className="flex items-center space-x-3">
              <Search className="h-5 w-5 text-gray-500" />
              <input type="text" placeholder="Search Twitter" className="bg-transparent focus:outline-none w-full" />
            </div>
          </div>

          {/* Trends */}
          <div className="rounded-xl bg-gray-50 p-4 mb-4">
            <h2 className="text-xl font-bold">Tendances pour vous</h2>
            <div className="mt-4 space-y-4">
              {["Technology", "Programming", "React", "JavaScript", "WebDev"].map((trend, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <span className="font-medium">#{trend}</span>
                    <p className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + "K Tweets"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who to follow */}
          <div className="rounded-xl bg-gray-50 p-4">
            <h2 className="text-xl font-bold">Qui suivre</h2>
            <div className="mt-4 space-y-4">
              {users.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={user.photo} alt={user.pseudo} className="h-10 w-10 rounded-full" />
                    <div>
                      <p className="font-medium">{user.pseudo}</p>
                      <p className="text-sm text-gray-500">@{user.pseudo}</p>
                    </div>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border border-gray-300 bg-transparent hover:bg-gray-50 px-4 py-2 text-sm">
                    Suivre
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
