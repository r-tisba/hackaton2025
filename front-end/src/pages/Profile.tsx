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
  ];
  return (
    <div className="profile-container mt-5">
      {/* Bannière de profil */}
      <div
        className="profile-banner"
        style={{ backgroundImage: `url(${currentUser.banniere || "https://picsum.photos/800/600?random=1&blur=2"})` }}
      >
        <img
          src={currentUser.photo || "https://picsum.photos/199?random=2"}
          alt={currentUser.pseudo}
          className="profile-avatar"
        />
      </div>

      {/* Informations utilisateur */}
      <div className="profile-header">
        <div>
          <h2>{currentUser.pseudo}</h2>
          <p className="profile-username">@{currentUser.pseudo}</p>
        </div>
        <Button variant="outline">Edit profile</Button>
      </div>

      <div className="profile-info">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

        <div className="profile-links">
          <div className='flex'>
            <MapPin size={16} /> Saint-quentin-en-yvelines, France
          </div>
          <div className='flex'>
            <LinkIcon size={16} />
            <a href="https://ecole-ipssi.com/" target="_blank"> https://ecole-ipssi.com/ </a>
          </div>
          <div className='flex'>
            <Calendar size={16} /> Joined {currentUser.joined}
          </div>
        </div>

        <div className="profile-stats">
          <span>{currentUser.following} Following</span>
          <span>{currentUser.followers} Followers</span>
        </div>
      </div>

      {/* Navigation entre les sections */}
      <div className="profile-tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={`/profile/${id}/${tab.path}`}
            className={`profile-tab ${location.pathname === `/profile/${id}/${tab.path}` ? "active" : ""}`}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Contenu dynamique des onglets */}
      <div className="profile-content">
        <Outlet />
      </div>

      {/* Liste des tweets */}
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <TweetCard
            key={tweet._id}
            tweet={tweet}
            onLike={() => {}}
            onRetweet={() => {}}
            onReply={() => {}}
            onBookmark={() => {}}
          />
        ))
      ) : (
        <div className="no-tweets">Vous n'avez aucun tweet pour le moment.</div>
      )}
    </div>
  );
}