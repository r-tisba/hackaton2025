import React from 'react';
import { Heart, Repeat2, MessageCircle, UserPlus } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

export function Notifications() {
  return (
    <div className="flex justify-center">
      {/* Main Content */}
      <div className="w-full max-w-2xl">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
          <h1 className="text-xl font-bold text-center">Notifications</h1>
        </header>

        <div className="divide-y divide-gray-200">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-3 p-4 ${
                !notification.isRead ? 'bg-blue-50' : ''
              } flex-col sm:flex-row`}
            >
              <img
                src={notification.user.profileImage}
                alt={notification.user.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {notification.type === 'like' && <Heart className="h-5 w-5 text-red-500" />}
                  {notification.type === 'retweet' && <Repeat2 className="h-5 w-5 text-green-500" />}
                  {notification.type === 'reply' && <MessageCircle className="h-5 w-5 text-blue-500" />}
                  {notification.type === 'follow' && <UserPlus className="h-5 w-5 text-purple-500" />}

                  <span className="text-sm">
                    <span className="font-bold">{notification.user.name}</span>
                    {notification.type === 'like' && ' a aimé votre Tweet'}
                    {notification.type === 'retweet' && ' a retweeté votre Tweet'}
                    {notification.type === 'reply' && ' a répondu à votre Tweet'}
                    {notification.type === 'follow' && ' vous suit'}
                  </span>
                </div>

                {notification.tweet && (
                  <p className="mt-2 text-gray-700 text-sm bg-gray-100 p-3 rounded-lg w-full sm:w-auto">
                    {notification.tweet.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar (Tendances + Suggestions) */}
      <div className="hidden lg:block fixed right-0 w-80 p-4 h-full overflow-y-auto">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search h-5 w-5 text-gray-500">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
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
            {[
              { name: "Jane Cooper", username: "@jane_cooper", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
              { name: "Cody Fisher", username: "@cody_fisher", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={user.img} alt={user.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
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
  );
}
