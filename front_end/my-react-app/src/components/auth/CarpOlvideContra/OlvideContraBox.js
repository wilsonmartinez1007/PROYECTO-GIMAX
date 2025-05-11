import React, { useState } from "react";

import { Form, useNavigate } from "react-router-dom"; 
function OlvideContraBox({onBuscar}) {
    const [cedula, setCedula] = useState("");
    const [panel, setPanel] = useState('codigo'); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onBuscar(cedula);
        setPanel('codigo');
    };

    const goToSalir = () => {
        navigate("/login");
    };
    
    
    
    



    return (
        <div style={{height:"0vh"}}>
        {panel === 'buscar' && (
        <div style={{
            height: "220px",
            width: "400px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            marginTop:200, 
            marginLeft: -55
          }} >
    
        <div style={{ 
            // Centra horizontalmente dentro del contenedor
            marginTop:10, 
            marginLeft: -120,
            fontSize: "20px",fontFamily: 'Lilita One',fontWeight: "bold"
            }}>
                Recuperar contraseña
            
          </div>
          <div style={{ 
            // Centra horizontalmente dentro del contenedor
            marginTop:30, 
            marginLeft: -35
            }}>
                Ingresa el codigo para verificar tu cuenta
            
          </div>
          <form  onSubmit={handleSubmit}>
          <div>
          <input 
             type="text"
             value={cedula}
             onChange={(e) => setCedula(e.target.value)}
             style ={{marginTop:40, marginLeft: -36,width: "270px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid gray"}}
             placeholder="Cedula" />
          </div>
          
        <div style={{marginTop:20, marginLeft: 260,}}>
        <button 
        type="submit" style={{ height: "30px",marginBottom: "10px", background: "red", color: "black", borderRadius: 5, borderColor: 'black',border: "none",outline: "none", width: "100px"  }}>
          Buscar
        </button>
          </div>
          </form>
          <div style={{marginTop:-40, marginLeft: 36}}>
          <button onClick={goToSalir} 
           type="submit" style={{ height: "30px",marginBottom: "1px", background: "#D3D3D3", color: "black", borderRadius: 5, borderColor: 'black',border: "none",outline: "none", width: "100px"  }}>
          Cancelar
        </button></div>
          </div>

      )}
      {panel === 'codigo' && (
        <div style={{
            height: "220px",
            width: "400px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            marginTop:200, 
            marginLeft: -55
          }} >
    
        <div style={{ 
            // Centra horizontalmente dentro del contenedor
            marginTop:10, 
            marginLeft: -120,
            fontSize: "20px",fontFamily: 'Lilita One',fontWeight: "bold"
            }}>
                Recuperar contraseña
            
          </div>
          <div style={{ 
            // Centra horizontalmente dentro del contenedor
            marginTop:30, 
            marginLeft: -35
            }}>
                Ingresa tu cedula para buscar tu cuenta.
            
          </div>
          <form  onSubmit={handleSubmit}>
          <div>
          <input 
             type="text"
             value={cedula}
             onChange={(e) => setCedula(e.target.value)}
             style ={{marginTop:40, marginLeft: -36,width: "270px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid gray"}}
             placeholder="Cedula" />
          </div>
          
        <div style={{marginTop:20, marginLeft: 260,}}>
        <button 
        onClick={() => setPanel('buscar')} 
        type="submit" style={{ height: "30px",marginBottom: "10px", background: "red", color: "black", borderRadius: 5, borderColor: 'black',border: "none",outline: "none", width: "100px"  }}>
          Buscar
        </button>
          </div>
          </form>
          <div style={{marginTop:-40, marginLeft: 36}}>
          <button onClick={goToSalir} 
           type="submit" style={{ height: "30px",marginBottom: "1px", background: "#D3D3D3", color: "black", borderRadius: 5, borderColor: 'black',border: "none",outline: "none", width: "100px"  }}>
          Cancelar
        </button></div>
          </div>


          )}
          </div>
    
    );
  }

export default OlvideContraBox;
