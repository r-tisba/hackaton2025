import { Search } from 'lucide-react';
import { Button } from '../ui/Button';

const trends = [
  { tag: 'Technology', tweets: '125K' },
  { tag: 'Programming', tweets: '85K' },
  { tag: 'React', tweets: '65K' },
  { tag: 'JavaScript', tweets: '45K' },
  { tag: 'WebDev', tweets: '35K' },
];

const [suggestions, setSuggestions] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setSuggestions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };
}, []);

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
          {suggestions.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={user.photo} alt={user.pseudo} className="h-10 w-10 rounded-full" />
                <div>
                  <p className="font-medium">{user.pseudo}</p>
                  <p className="text-sm text-gray-500">@{user.pseudo}</p>
                </div>
              </div>
              <button className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border border-gray-300 bg-transparent hover:bg-gray-50 px-4 py-2 text-sm">
                Suivre
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}