import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

function BlogDetails() {
    const location = useLocation();
@@ -24,13 +24,14 @@ function BlogDetails() {

    return (
        <div>
            <h2>Blog Details</h2>
            {blog ? (
                <div>
                    <h3>{blog.title}</h3>
                    <p>Content: {blog.content}</p>
                    <p>Author: {blog.author.username}</p>
                    <p>Created At: {blog.created_at}</p>
                <div className='blog-details-container'>
                    <a><Link to="/home">Back Home</Link></a>
                    <h2>{blog.title}</h2>
                    <p><strong>Author:</strong> {blog.author.username}</p>
                    <p><strong>Created At:</strong> {blog.created_at}</p>
                    <hr /> {/* Line to separate details from content */}
                    <p>{blog.content}</p>
                    {/* Add other details as needed */}
                </div>
            ) : 