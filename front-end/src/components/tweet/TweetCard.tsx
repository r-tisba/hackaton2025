import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Repeat2, Share, Bookmark } from 'lucide-react';
import type { Tweet } from '@/types';

interface TweetCardProps {
  tweet: Tweet;
  onLike: (id: Number) => void;
  onRetweet: (id: Number) => void;
  onReply: (id: Number) => void;
  onBookmark: (id: Number) => void;
  id_user: Number;
}

export function TweetCard({ tweet, onLike, onRetweet, onReply, onBookmark }: TweetCardProps) {
  console.log(tweet);
  return (
    <article className="border-b border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex space-x-3">
        <img
          src={tweet.id_user?.pseudo ?? "https://picsum.photos/199"}
          alt={tweet.id_user?.pseudo ?? ""}
          className="h-12 w-12 rounded-full"
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{tweet.id_user?.pseudo}</span>
            <span className="text-gray-500">@{tweet.id_user?.pseudo}</span>
            <span className="text-gray-500">·</span>
            <time className="text-gray-500">
              {formatDistanceToNow(new Date(tweet.createdAt))}
            </time>
          </div>
          
          <p className="text-gray-900">{tweet.contenue}</p>
          
          {tweet.images && (
            <div className="mt-3 grid gap-2">
              {tweet.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="rounded-2xl border border-gray-200"
                />
              ))}
            </div>
          )}
          
          {tweet.hashtags && (
            <div className="flex flex-wrap gap-2">
              {tweet.hashtags.map((tag) => (
                <span key={tag} className="text-blue-500">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-3 flex justify-between text-gray-500">
            <button
              onClick={() => onReply(tweet.id)}
              className="flex items-center space-x-2 hover:text-blue-500"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{tweet.replies}</span>
            </button>
            
            <button
              onClick={() => onRetweet(tweet.id)}
              className={`flex items-center space-x-2 ${
                tweet.isRetweeted ? 'text-green-500' : 'hover:text-green-500'
              }`}
            >
              <Repeat2 className="h-5 w-5" />
              <span>{tweet.retweets}</span>
            </button>
            
            <button
              onClick={() => onLike(tweet.id)}
              className={`flex items-center space-x-2 ${
                tweet.isLiked ? 'text-red-500' : 'hover:text-red-500'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>{tweet.likes}</span>
            </button>
            
            <button
              onClick={() => onBookmark(tweet.id)}
              className={`flex items-center space-x-2 ${
                tweet.isBookmarked ? 'text-blue-500' : 'hover:text-blue-500'
              }`}
            >
              <Bookmark className="h-5 w-5" />
            </button>
            
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}