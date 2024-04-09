import { Link } from 'react-router-dom';

function Header({ handleLogout }) {
    return (
        <header>
            <div className="logo">TechTalk</div>
            <nav>
                <Link to="/manage-blogs">Manage Blogs</Link>
            </nav>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
}

export default Header;