import React from 'react';
import { TweetComposer } from '@/components/tweet/TweetComposer';
import { TweetCard } from '@/components/tweet/TweetCard';
import { mockTweets } from '@/data/mockData';

export function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
        <h1 className="text-xl font-bold">Home</h1>
      </header>
      
      <TweetComposer />
      
      <div className="divide-y divide-gray-200">
        {mockTweets.map((tweet) => (
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
    </>
  );
}