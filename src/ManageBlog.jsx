import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ManageBlogs() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userBlogs, setUserBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            navigate('/'); // Redirect to login page if user ID doesn't exist
        } else {
            setLoggedIn(true);
            fetchUserBlogs();
        }
    }, [navigate]);

    const fetchUserBlogs = async () => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await fetch(`http://127.0.0.1:3000/blogs/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user blogs');
            }
            const data = await response.json();
            setUserBlogs(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePostBlog = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('user_id');

        try {
            const response = await fetch('http://127.0.0.1:3000/post-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    content,
                    image_url: imageUrl,
                    user_id: userId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to post blog');
            }
            setTitle('');
            setContent('');
            setImageUrl('');
            fetchUserBlogs();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteBlog = async (blogId) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/delete-blog/${blogId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }
            fetchUserBlogs();
        } catch (error) {
            console.error(error);
        }
    };

    if (!loggedIn) {
        return <div>Please login to access the content.</div>;
    }

    return (
        <div className="manage-blogs-container">
            <h3><Link to="/home">Back Home</Link></h3>
            {/* Form for posting a new blog */}
            <form className="post-blog-form" onSubmit={handlePostBlog}>
                <div className="form-group">
                    <label htmlFor="blog-title">Title:</label>
                    <input
                        type="text"
                        id="blog-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="blog-content">Content:</label>
                    <textarea
                        id="blog-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="blog-image-url">Image URL:</label>
                    <input
                        type="text"
                        id="blog-image-url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Post Blog</button>
            </form>

            <h2>Your Blogs</h2>
            {/* Display user's blogs */}
            <div className="blog-list">
                
                {userBlogs.map(blog => (
                    <div className="blog-item" key={blog.id}>
                        <h3>{blog.title}</h3>
                        {/* <p>{blog.content}</p> */}
                        <img src={blog.image_url} alt="Blog Thumbnail" />
                        <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageBlogs;