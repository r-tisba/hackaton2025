import React from 'react';
import { MessageCircle } from 'lucide-react';
import { mockUsers } from '@/data/mockData';

export function Messages() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
        <h1 className="text-xl font-bold">Messages</h1>
      </header>

      <div className="divide-y divide-gray-200">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-4 p-4 hover:bg-gray-50"
          >
            <img
              src={user.profileImage}
              alt={user.name}
              className="h-12 w-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <h2 className="font-bold">{user.name}</h2>
                <span className="text-sm text-gray-500">2h</span>
              </div>
              <p className="text-gray-600">Click to start a conversation</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}