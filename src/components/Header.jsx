import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <header>
            <h1>Shop</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {isAuthenticated ? (
                        <li onClick={handleLogout} className="logout-link">Logout</li>
                    ) : (
                        <button><Link to="/login">Login</Link></button>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
