import React from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { mockUsers } from '../data/mockData';

export function Profile() {
  const currentUser = mockUsers[0];
  const location = useLocation();

  // Définition des onglets avec leurs liens
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
          <h1 className="text-xl font-bold">{currentUser.name}</h1>
        </div>
      </header>

      <div className="relative">
        <img
          src={currentUser.bannerImage}
          alt="Profile banner"
          className="h-48 w-full object-cover"
        />
        <div className="absolute -bottom-16 left-4">
          <img
            src={currentUser.profileImage}
            alt={currentUser.name}
            className="h-32 w-32 rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="mb-4 mt-20 px-4">
        <div className="flex justify-end">
          <Button variant="outline">Edit profile</Button>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">{currentUser.name}</h2>
          <p className="text-gray-500">@{currentUser.username}</p>
          <p className="mt-4">{currentUser.bio}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-gray-500">
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center">
              <LinkIcon className="mr-1 h-4 w-4" />
              <a href="#" className="text-blue-500">example.com</a>
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
              to={`/profile/${tab.path}`}
              className={`flex-1 py-4 text-center ${
                location.pathname === `/profile/${tab.path}` 
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
      </div>
    </>
  );
}
