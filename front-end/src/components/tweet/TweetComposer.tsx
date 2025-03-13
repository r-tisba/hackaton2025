import { useState, useEffect } from 'react';
import { Image, Smile } from 'lucide-react';
import { Button } from '../ui/Button';
import axios from 'axios';

export function TweetComposer() {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const { _id: id } = user;  // Extraire l'id de l'utilisateur

      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile/${id}`, {
          headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tweetData = {
        contenue: content,
        attachment: null,  // Assurez-vous que 'images' contient les URL des images ou leur représentation
      };
  
      // Envoi de la requête POST pour créer un tweet
      await axios.post('http://localhost:5000/api/tweets/create', tweetData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

  
      // Réinitialisation après envoi
      setContent('');
      setImages([]);
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex space-x-4">
        {user && (
          <img
            src={user.photo ?? 'https://picsum.photos/200?random=1'}
            alt={user.name}
            className="h-12 w-12 rounded-full"
          />
        )}
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full resize-none border-0 bg-transparent text-xl placeholder-gray-500 focus:outline-none"
            rows={3}
          />
          
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="rounded-2xl border border-gray-200"
                />
              ))}
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2 text-blue-500">
              <button type="button" className="p-2 hover:bg-blue-50 rounded-full">
                <Image className="h-5 w-5" />
              </button>
              <button type="button" className="p-2 hover:bg-blue-50 rounded-full">
                <Smile className="h-5 w-5" />
              </button>
            </div>
            
            <Button
              type="submit"
              disabled={!content.trim()}
              className="px-6"
            >
              Tweet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}