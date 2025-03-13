import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { TweetCard } from '../components/tweet/TweetCard';
import axios from 'axios';

export function Profile() {
  // Récupérer l'utilisateur depuis le localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const { _id: id } = user;  // Extraire l'id de l'utilisateur
  console.log(user);
  
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:5000/api/users/profile/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("zrzetbzethztzet"+response.data);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur:", error);
      }
    };

    const fetchTweets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tweets/mytweets", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setTweets(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
      }
    };

    if (id) {
      fetchUserProfile();
      fetchTweets();
    }
  }, [id]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const tabs = [
    { name: "Tweets", path: "tweets" },
    { name: "Replies", path: "replies" },
    { name: "Media", path: "media" },
    { name: "Likes", path: "likes" }
  ];

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">{currentUser.pseudo}</h1>
        </div>
      </header>

      <div className="relative">
        <img
          src={currentUser.banniere ? currentUser.banniere : "https://picsum.photos/800/600?random=1&blur=2"}
          alt="Profile banner"
          className="h-48 w-full object-cover"
        />
        <div className="absolute -bottom-16 left-4">
          <img
            src={currentUser.photo ? currentUser.photo : "https://picsum.photos/199?random=2"}
            alt={currentUser.pseudo}
            className="h-32 w-32 rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="mb-4 mt-20 px-4">
        <div className="flex justify-end">
          <Button variant="outline">Edit profile</Button>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">{currentUser.pseudo}</h2>
          <p className="text-gray-500">@{currentUser.pseudo}</p>
          <p className="mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

          <div className="mt-4 flex flex-wrap gap-4 text-gray-500">
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Saint-quentin-en-yvelines, France
            </div>
            <div className="flex items-center">
              <LinkIcon className="mr-1 h-4 w-4" />
              <a href="https://ecole-ipssi.com/" target="_blank" className="text-blue-500">https://ecole-ipssi.com/</a>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Joined {currentUser.joined}
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <span>
              <span className="font-bold">{currentUser.following}</span>{' '}
              <span className="text-gray-500">Following</span>
            </span>
            <span>
              <span className="font-bold">{currentUser.followers}</span>{' '}
              <span className="text-gray-500">Followers</span>
            </span>
          </div>
        </div>
      </div>

      {/* NAVIGATION ENTRE LES SECTIONS */}
      <div className="border-t border-gray-200">
        <nav className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={`/profile/${id}/${tab.path}`}
              className={`flex-1 py-4 text-center ${
                location.pathname === `/profile/${id}/${tab.path}` 
                  ? "border-b-2 border-blue-500 text-blue-500" 
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>

        {/* Contenu dynamique des onglets */}
        <div className="divide-y divide-gray-200 p-4">
          <Outlet />
        </div>

        {/* Afficher mes tweet dans le composer */}
        {tweets.map((tweet) => (
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
    </>
  );
}
