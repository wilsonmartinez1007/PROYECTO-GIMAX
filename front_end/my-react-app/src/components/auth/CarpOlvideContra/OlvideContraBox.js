import React, { useState } from "react";

import { Form, useNavigate } from "react-router-dom"; 
function OlvideContraBox({onBuscar, email, onCodigo, codigo2}) {
    const [cedula, setCedula] = useState("");
    const [panel, setPanel] = useState('codigo'); 
    const navigate = useNavigate();
    const sleep = (ms)=> {
      return new Promise(resolve => setTimeout(resolve, ms));
      }
    const handleBuscar = (e) => {
      e.preventDefault();
      onBuscar(cedula);
      sleep(1000).then(() => {
        setPanel('buscar');
      });
  };
    const handleValidar = (e) => {
      e.preventDefault();
      // Aquí puedes validar el código si lo necesitas (en el backend, por ejemplo)
      onCodigo();
      sleep(1000).then(() => {
        setPanel('valido');
      });
      
  };
    const handleCambiar = (e) => {
      e.preventDefault();
      // Aquí iría la lógica para cambiar la contraseña
      alert("Contraseña cambiada con éxito");
      navigate("/login"); // redirige al login
  };


    const goToSalir = () => {
        navigate("/login");
    };
    
    
    
    



    return (
        <div style={{height:"0vh"}}>
        
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
          <form  onSubmit={handleBuscar}>
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
            marginTop:20, 
            marginLeft: -35
            }}>
                Ingresa el codigo que fue dirijido a tu correo    {email}
            
          </div>
          <form  onSubmit={handleValidar}>
          <div>
          <input 
             type="text"
             //onChange={(e) => setCodigo(e.target.value)} tengo que crear una funcion que compare con un if si el codigo2 que es el que traigo de backend es el mismo la que dijita
             style ={{marginTop:40, marginLeft: -36,width: "270px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid gray"}}
             placeholder="Codigo" />
             
          </div>
          
        <div style={{marginTop:20, marginLeft: 260,}}>
        <button 

        type="submit" style={{ height: "30px",marginBottom: "10px", background: "red", color: "black", borderRadius: 5, borderColor: 'black',border: "none",outline: "none", width: "100px"  }}>
          Validar
        </button>
          </div>
          </form>
          <div style={{marginTop:-40, marginLeft: 36}}>
          <button // esto aun esta mal onClick={goToSalir} 
           type="submit" style={{ height: "30px",marginBottom: "1px", background: "#D3D3D3", color: "black", borderRadius: 5, borderColor: 'black',border: "none",outline: "none", width: "100px"  }}>
          Cancelar
        </button></div>
          </div>

      )}
        {panel === 'valido' && (
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
            marginTop:20, 
            marginLeft: -35
            }}>
                Ingresa su nueva contraseña
            
          </div>
          <form  onSubmit={handleCambiar}>
          <div>
          <input 
             type="text"
             style ={{marginTop:40, marginLeft: -36,width: "270px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid gray"}}
             placeholder="Contraseña" />
          </div>
          
        <div style={{marginTop:20, marginLeft: 260,}}>
        <button 
        type="submit" style={{ height: "30px",marginBottom: "10px", background: "red", color: "black", borderRadius: 5, borderColor: 'black',border: "none",outline: "none", width: "100px"  }}>
          Cambiar
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
