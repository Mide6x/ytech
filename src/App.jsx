import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './useraccount/dashboard';
import Progress from './useraccount/components/Progress';
import Tests from './useraccount/components/Tests';
import Settings from './useraccount/components/Settings';
import CursorFollower from './components/CursorFollower';
import './styles/global.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
  }, []);

  return (
    <Router>
      <CursorFollower />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/progress" element={<Progress />} />
        <Route path="/dashboard/practice" element={<Tests />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
