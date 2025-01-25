import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './useraccount/dashboard';
import Progress from './useraccount/components/Progress';
import Tests from './useraccount/components/Tests';
import Settings from './useraccount/components/Settings';
import AdminDashboard from './adminaccount/admindashboard';
import ManageLessons from './adminaccount/components/ManageLessons';
import ManageUsers from './adminaccount/components/ManageUsers';
import AdminSettings from './adminaccount/components/AdminSettings';
import CursorFollower from './components/CursorFollower';
import './styles/global.css';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LessonPlayer from './components/LessonPlayer';
function App() {
  useEffect(() => {
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
  }, []);

  return (
    <ThemeProvider>
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
          <Route path="/lessons/:lessonId" element={<LessonPlayer />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/lessons" element={<ManageLessons />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
