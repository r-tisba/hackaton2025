import { useState } from 'react';
import { Image, Smile } from 'lucide-react';
import { Button } from '../ui/Button';

export function TweetComposer() {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tweet submission
    setContent('');
    setImages([]);
  };

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex space-x-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />
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