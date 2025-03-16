import React from "react";
//No se esta usando
function LoginContainer({ children }) {
  return (
    <div style={{
      
      width: "300px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
       
    }}>
      {children}
    </div>
  );
}

export default LoginContainer;

