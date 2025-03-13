import { TweetCard } from '@/components/tweet/TweetCard';
import { mockUsers } from '@/data/mockData';

export function Likes() {

  const fakeLikedTweets = [
    { 
      id: 1, 
      content: "L'intelligence artificielle va changer le monde !", 
      author: mockUsers[1], 
      likes: 100, 
      retweets: 20, 
      replies: 10,
      createdAt: new Date().toISOString(), 
      isLiked: true, 
      isRetweeted: false, 
      isBookmarked: false, 
      hashtags: ["#IA", "#Futur"], 
      mentions: ["@elonmusk"] 
    },
    { 
      id: 2, 
      content: "Les meilleurs moments sont souvent imprévus ✨", 
      author: mockUsers[2], 
      likes: 75, 
      retweets: 15, 
      replies: 5,
      createdAt: new Date().toISOString(),
      isLiked: true,
      isRetweeted: false,
      isBookmarked: false,
      hashtags: ["#Bonheur"],
      mentions: []
    },
    { 
      id: 3, 
      content: "React ou Vue ? Le débat continue... 😆", 
      author: mockUsers[3], 
      likes: 60, 
      retweets: 12, 
      replies: 3,
      createdAt: new Date().toISOString(),
      isLiked: true,
      isRetweeted: false,
      isBookmarked: false,
      hashtags: ["#React", "#Vue"],
      mentions: []
    }
  ];

  return (
    <>
      {fakeLikedTweets.map((tweet) => (
        <TweetCard 
          key={tweet.id} 
          tweet={tweet} 
          onLike={() => {}} 
          onRetweet={() => {}} 
          onReply={() => {}} 
          onBookmark={() => {}} 
        />
      ))}
    </>
  );
}
