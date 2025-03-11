import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { TweetCard } from '@/components/tweet/TweetCard';
import { mockTweets } from '@/data/mockData';

export function Explore() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTweets = mockTweets.filter(tweet => 
    tweet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tweet.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    tweet.author.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="sticky top-0 z-10 bg-white/80 p-4 backdrop-blur">
        <div className="rounded-full bg-gray-100 p-3">
          <div className="flex items-center space-x-3">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Twitter"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {searchQuery ? (
        <div className="divide-y divide-gray-200">
          {filteredTweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onLike={() => {}}
              onRetweet={() => {}}
              onReply={() => {}}
              onBookmark={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="p-4">
          <h2 className="mb-4 flex items-center text-xl font-bold">
            <TrendingUp className="mr-2 h-6 w-6" />
            Trending
          </h2>
          <div className="divide-y divide-gray-200">
            {mockTweets
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 5)
              .map((tweet) => (
                <TweetCard
                  key={tweet.id}
                  tweet={tweet}
                  onLike={() => {}}
                  onRetweet={() => {}}
                  onReply={() => {}}
                  onBookmark={() => {}}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}