import { Search } from 'lucide-react';
import { Button } from '../ui/Button';

const trends = [
  { tag: 'Technology', tweets: '125K' },
  { tag: 'Programming', tweets: '85K' },
  { tag: 'React', tweets: '65K' },
  { tag: 'JavaScript', tweets: '45K' },
  { tag: 'WebDev', tweets: '35K' },
];

const suggestions = [
  {
    name: 'Jane Cooper',
    username: 'jane_cooper',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Cody Fisher',
    username: 'cody_fisher',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export function RightSidebar() {
  return (
    <div className="fixed ml-[800px] h-full w-80 p-4">
      <div className="rounded-full bg-gray-100 p-3">
        <div className="flex items-center space-x-3">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="bg-transparent focus:outline-none"
          />
        </div>
      </div>
      
      <div className="mt-4 rounded-xl bg-gray-50 p-4">
        <h2 className="text-xl font-bold">Trends for you</h2>
        <div className="mt-4 space-y-4">
          {trends.map((trend) => (
            <div key={trend.tag} className="flex justify-between">
              <div>
                <span className="font-medium">#{trend.tag}</span>
                <p className="text-sm text-gray-500">{trend.tweets} Tweets</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 rounded-xl bg-gray-50 p-4">
        <h2 className="text-xl font-bold">Who to follow</h2>
        <div className="mt-4 space-y-4">
          {suggestions.map((user) => (
            <div key={user.username} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}