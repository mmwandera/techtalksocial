import React from 'react';
function BlogCard({ id, title, content, image_url, author, created_at, onShowDetails }) {
    // Function to get a snippet of content
    const getContentSnippet = () => {
        // Assuming you want to show only the first 100 characters as snippet
        return content.length > 100 ? content.substring(0, 100) + '...' : content;
        return content.length > 100 ? content.substring(0, 50) + '...' : content;
    };

    // Function to format the date
@@ -15,13 +15,18 @@ function BlogCard({ id, title, content, image_url, author, created_at, onShowDet

    return (
        <div className="blog-card">
            <img src={image_url} alt="Blog Thumbnail" />
            <h3>{title}</h3>
            <p>Author: {author.username}</p>
            <p>{getContentSnippet()}</p>
            <p>Created at: {formatDate(created_at)}</p>
            {/* Add a button to show more details */}
            <button onClick={() => onShowDetails(id)}>Show More</button>
            {image_url && (
                <img src={image_url} alt="Blog Thumbnail" />
            )}
            <div className="blog-content">
                <h3>{title}</h3>
                <p>Author: {author.username}</p>
                <p>{getContentSnippet()}</p>
                {/* <p>Created at: {formatDate(created_at)}</p> */}
                {/* Add a button to show more details */}
                <button onClick={() => onShowDetails(id)}>Show More</button>
            </div>

        </div>
    );
}