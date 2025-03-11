export interface User {
  id: string;
  username: string;
  name: string;
  bio: string;
  profileImage: string;
  bannerImage: string;
  followers: number;
  following: number;
  joined: string;
}

export interface Tweet {
  id: string;
  content: string;
  images?: string[];
  createdAt: string;
  author: User;
  likes: number;
  retweets: number;
  replies: number;
  isLiked: boolean;
  isRetweeted: boolean;
  isBookmarked: boolean;
  hashtags: string[];
  mentions: string[];
}

export interface Notification {
  id: string;
  type: 'like' | 'retweet' | 'reply' | 'follow' | 'mention';
  user: User;
  tweet?: Tweet;
  createdAt: string;
  isRead: boolean;
}