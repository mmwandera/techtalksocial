import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || 'Failed to log in');
            }

            // Store the user ID in local storage upon successful login
            localStorage.setItem('user_id', data.user_id);

            // Redirect to home page after successful login
            // Replace '/' with your actual home page route
            window.location.href = '/home';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container"> {/* Apply a container class */}
            <h1>TechTalk</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form"> {/* Apply a form class */}
                <div className="form-group"> {/* Apply a group class */}
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group"> {/* Apply a group class */}
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>} {/* Apply a class for error message */}
            </form>
            <p>Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
}

export default Login;
