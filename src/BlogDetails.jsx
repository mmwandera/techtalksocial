import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function BlogDetails() {
    const location = useLocation();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/blog-details/${location.state.blogId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog details');
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogDetails();
    }, [location.state.blogId]);

    return (
        <div>
            {blog ? (
                <div className='blog-details-container'>
                    <a><Link to="/home">Back Home</Link></a>
                    <h2>{blog.title}</h2>
                    <p><strong>Author:</strong> {blog.author.username}</p>
                    <p><strong>Created At:</strong> {blog.created_at}</p>
                    <hr /> {/* Line to separate details from content */}
                    <p>{blog.content}</p>
                    {/* Add other details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BlogDetails;