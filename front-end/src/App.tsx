import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Notifications } from './pages/Notifications';
import { Messages } from './pages/Messages';
import { Bookmarks } from './pages/Bookmarks';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Sidebar />
        
        <main className="ml-72 max-w-[600px] border-x border-gray-200">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Register />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        
        
      </div>
    </Router>
  );
}

export default App;