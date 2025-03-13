import React from 'react';
import { Home, Bell, Bookmark, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Accueil', href: '/home', icon: <Home /> },
  { name: 'Explore', href: '/explore', icon: <Search /> },
  { name: 'Notifications', href: '/notifications', icon: <Bell /> },
  { name: 'Signet', href: '/bookmarks', icon: <Bookmark /> },
  { name: 'Profil', href: '/profile', icon: <User /> },
];

export function Sidebar() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("loggedIn") === "true";

  return (
    <div className="sidebar d-flex flex-column">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={isAuthenticated ? item.href : "#"}
          className={`d-flex align-items-center p-3 text-white text-decoration-none ${location.pathname === item.href ? 'fw-bold' : ''}`}
        >
          {item.icon} <span className="ms-3">{item.name}</span>
        </Link>
      ))}
      <button className="btn btn-primary mt-auto">Tweet</button>
    </div>
  );
}
