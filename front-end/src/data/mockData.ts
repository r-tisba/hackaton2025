import type { Tweet, User, Notification } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Full-stack developer | Building awesome things with React and TypeScript',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    followers: 1234,
    following: 567,
    joined: 'January 2024',
  },
  {
    id: '2',
    username: 'jane_smith',
    name: 'Jane Smith',
    bio: 'UI/UX Designer | Creating beautiful user experiences',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    followers: 2345,
    following: 789,
    joined: 'March 2024',
  },
];

export const mockTweets: Tweet[] = [
  {
    id: '1',
    content: 'Just launched my new Twitter clone! 🚀 Built with #React and #TypeScript. What do you think?',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: mockUsers[0],
    likes: 42,
    retweets: 12,
    replies: 8,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: true,
    hashtags: ['React', 'TypeScript'],
    mentions: [],
  },
  {
    id: '2',
    content: 'Working on some new UI designs for the project. Can\'t wait to share them! 🎨 #Design #UI',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    author: mockUsers[1],
    likes: 56,
    retweets: 23,
    replies: 15,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: false,
    hashtags: ['Design', 'UI'],
    mentions: [],
    images: [
      'https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: mockUsers[1],
    tweet: mockTweets[0],
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: '2',
    type: 'retweet',
    user: mockUsers[1],
    tweet: mockTweets[0],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: '3',
    type: 'follow',
    user: mockUsers[1],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
];