import React from 'react';
import { Bell, Heart, Repeat2, MessageCircle, UserPlus } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';

export function Notifications() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
        <h1 className="text-xl font-bold">Notifications</h1>
      </header>

      <div className="divide-y divide-gray-200">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-4 p-4 ${
              !notification.isRead ? 'bg-blue-50' : ''
            }`}
          >
            {notification.type === 'like' && (
              <Heart className="h-5 w-5 text-red-500" />
            )}
            {notification.type === 'retweet' && (
              <Repeat2 className="h-5 w-5 text-green-500" />
            )}
            {notification.type === 'reply' && (
              <MessageCircle className="h-5 w-5 text-blue-500" />
            )}
            {notification.type === 'follow' && (
              <UserPlus className="h-5 w-5 text-purple-500" />
            )}

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <img
                  src={notification.user.profileImage}
                  alt={notification.user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <span className="font-bold">{notification.user.name}</span>
                  {notification.type === 'like' && ' liked your Tweet'}
                  {notification.type === 'retweet' && ' retweeted your Tweet'}
                  {notification.type === 'reply' && ' replied to your Tweet'}
                  {notification.type === 'follow' && ' followed you'}
                </div>
              </div>
              {notification.tweet && (
                <p className="mt-2 text-gray-600">{notification.tweet.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}