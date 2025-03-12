import { TweetCard } from '@/components/tweet/TweetCard';
import { mockUsers } from '@/data/mockData';

export function Tweets() {
  const currentUser = mockUsers[0];

  const fakeTweets = [
    { id: 1, content: "Just finished an amazing book on AI! 🤖📚", likes: 20, retweets: 5, replies: 2 },
    { id: 2, content: "Le café du matin, c’est sacré ☕ #MorningVibes", likes: 45, retweets: 10, replies: 7 },
    { id: 3, content: "Quelqu'un a testé le nouveau framework React ? 👀", likes: 32, retweets: 8, replies: 4 }
  ];

  return (
    <>
      {fakeTweets.map((tweet) => (
        <TweetCard 
          key={tweet.id} 
          tweet={{ id: tweet.id, content: tweet.content, author: currentUser, likes: tweet.likes, retweets: tweet.retweets, replies: tweet.replies }} 
          onLike={() => {}} 
          onRetweet={() => {}} 
          onReply={() => {}} 
          onBookmark={() => {}} 
        />
      ))}
    </>
  );
}
