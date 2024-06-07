import './App.css'
import { Routes,Route } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </div>
  );
} 

export default App
