import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Notifications } from './pages/Notifications';
import { Messages } from './pages/Messages';
import { Bookmarks } from './pages/Bookmarks';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TweetDetails } from './pages/TweetDetails';
import { ExtraSidebar } from './components/layout/ExtraSidebar';

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/";
  const isHome = location.pathname === "/home"

  return (
    <div className="app-container">
      {!isAuthPage && <Sidebar />} {/* Masquer la Sidebar à gauche si sur login/register */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tweet/:tweetId" element={<TweetDetails />} />
      </Routes>
      {!isAuthPage && isHome && <ExtraSidebar />} {/* Masquer la ExtraSidebar à droite si sur login/register */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;