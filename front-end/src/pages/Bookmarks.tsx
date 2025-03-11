import React from 'react';
import { TweetCard } from '@/components/tweet/TweetCard';
import { mockTweets } from '@/data/mockData';

export function Bookmarks() {
  const bookmarkedTweets = mockTweets.filter((tweet) => tweet.isBookmarked);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
        <h1 className="text-xl font-bold">Bookmarks</h1>
      </header>

      {bookmarkedTweets.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {bookmarkedTweets.map((tweet) => (
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
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold">Save Tweets for later</h2>
          <p className="mt-2 text-gray-600">
            Don't let the good ones fly away! Bookmark Tweets to easily find them
            again in the future.
          </p>
        </div>
      )}
    </>
  );
}