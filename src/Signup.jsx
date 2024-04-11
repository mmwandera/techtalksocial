import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:3000/signup', { // Using relative URL thanks to the proxy
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || 'Failed to sign up');
            }

            // Redirect to login page after successful signup
            // Replace '/login' with your actual login route
            window.location.href = '/';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signup-container">
            <h1>TechTalk</h1>
            <h2>Sign up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="signup-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="signup-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    );
}

export default Signup;