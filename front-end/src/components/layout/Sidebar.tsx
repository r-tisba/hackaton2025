import React from 'react';
import { Home, Bell, Bookmark, User, Search, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';

const navigation = [
  { name: 'Accueil', href: '/home', icon: Home },
  { name: 'Explore', href: '/explore', icon: Search },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Signet', href: '/bookmarks', icon: Bookmark },
  { name: 'Profil', href: '/profile', icon: User },
];

export function Sidebar() {
  const location = useLocation();
  
  const isAuthenticated = localStorage.getItem("loggedIn") === "true";

  return (
    <div className="fixed h-full w-72 border-r border-gray-200 p-4">
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <div key={item.name} className="relative">
                <Link
                  to={isAuthenticated ? item.href : "#"}
                  className={`flex items-center px-4 py-3 text-lg font-medium rounded-full ${
                    isActive ? 'text-black' : 'text-gray-700'
                  } ${isAuthenticated ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`} // Applique le style désactivé
                >
                  <Icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
                {!isAuthenticated && (
                  <div className="absolute inset-0" title="Connectez-vous pour accéder"></div>
                )}
              </div>
            );
          })}
        </div>

        <Button className="w-full" size="lg">
          Tweet
        </Button>
      </div>
    </div>
  );
}
