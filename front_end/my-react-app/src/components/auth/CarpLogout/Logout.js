import React from "react";

const Navbar = () => {
    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        
        await fetch('http://localhost:8000/logout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    };

    return (
        <nav>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </nav>
    );
};

export default Navbar;
