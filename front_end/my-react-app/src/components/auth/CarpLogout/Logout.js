import React from "react";

const Navbar = () => {
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        await fetch('http://127.0.0.1:8000/api/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });

        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <button onClick={handleLogout} style={{ 
            backgroundColor: "#c0392b", 
            color: "white", 
            border: "none", 
            borderRadius: "10px", 
            padding: "6px 12px", 
            cursor: "pointer" 
        }}>
            Cerrar sesión
        </button>

    );
};

export default Navbar;
