import { Route, Routes } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import Home from './Home';
import Login from './Login';
import ManageBlogs from './ManageBlogs';
import Signup from './Signup';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Login />} /> 
                <Route exact path="/home" element={<Home/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/manage-blogs" element={<ManageBlogs />} />
                <Route exact path="/blog-details/:blogId" element={<BlogDetails />} />
            </Routes>
        </div>
    );
}

export default App;
