import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Contact from './components/Contact';
import Login from './components/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </Router>
    );
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
    const location = useLocation(); 

    return (
        <>
           
            {location.pathname !== '/login' && (
                <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            )}
            <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/" element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} />
                <Route path="/product/:id" element={isAuthenticated ? <ProductDetails /> : <Navigate to="/login" />} />
                <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default App;
