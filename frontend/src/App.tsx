import './App.css'
import { Routes,Route } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';
import { Drafts } from './pages/Drafts';

function App() {
  return (
    <div>
      <Routes> 
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/publish/:id" element={<Publish />} />
        <Route path="/drafts" element={<Drafts />} />
      </Routes>
    </div>
  );
} 

export default App
