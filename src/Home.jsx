import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import Header from './Header';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Check if user ID exists in local storage
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            // Redirect to login page if user ID doesn't exist
            window.location.href = '/';
            return; // Prevent further execution of useEffect
        }

        setLoggedIn(true);

        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/blogs');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                console.log(data);
                setBlogs(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogs();

    }, []);

    // Function to handle logging blog id
    const handleShowDetails = (blogId) => {
        console.log('Clicked Show Details for blog id:', blogId);
        navigate(`/blog-details/${blogId}`, { state: { blogId } });
    };
    
    // Function to handle logout
    const handleLogout = () => {
        // Clear user ID from local storage
        localStorage.removeItem('user_id');
        // Redirect to login page
        navigate('/');
    };

    if (!loggedIn) {
        return <div>Please login to access the content.</div>;
    }

    return (
        <div>
            <Header handleLogout={handleLogout} />
            {/* Right Part */}
            <div className="right-section">
                {/* Blogs */}
                
                {/* Render blogs */}
                {blogs.map(blog => (
                    <div key={blog.id}>
                        {/* Blog Card */}
                        <BlogCard 
                            {...blog} 
                            onShowDetails={() => handleShowDetails(blog.id)} // Pass the function as a prop
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;