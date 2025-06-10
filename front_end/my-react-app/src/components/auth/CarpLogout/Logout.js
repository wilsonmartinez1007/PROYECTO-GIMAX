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
        <button onClick={handleLogout} 
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
            style={{ 
                padding: "10px",
                color: "red", 
                border: "none", 
                borderRadius: "10px", 
                cursor: "pointer",
        }}>
            Cerrar sesión
        </button>

    );
};

export default Navbar;
