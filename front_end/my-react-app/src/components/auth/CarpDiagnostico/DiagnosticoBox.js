import React from "react";
import "./Diagnostico.css"
function DiagnosticoBox({}) {
    return (
        <div style={{ height:"0vh"}}>
    
        <div style={{ 
            // Centra horizontalmente dentro del contenedor
            display: "flex", flexDirection: "column",
            height:"260px" ,  
            width: "300px",
            padding: "20px",
            marginTop: 200, 
            marginLeft: -495
            }}>
            <input
            className="mi-input"
             style ={{marginBottom: "10px", color: "black", padding: "8px",border: "none",outline: "none",background: "transparent",fontSize: "20px",fontFamily: 'Lilita One',fontWeight: "bold"    }}
             placeholder="Datos Personales" />
            <input
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Nombres" />
            <input
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Apellidos" />
            <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Edad" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Peso" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Altura" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Sexo" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="IMC" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Porcentaje grasa corporal" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Actividad fisica" />
          </div>
          <div style={{
                position: "absolute", 
                height: "450px",
                width: "2px",
                backgroundColor: "black",
                marginTop: -320,
                marginLeft: -130
                }}></div>
        <div style={{ 
                // Centra horizontalmente dentro del contenedor
                display: "flex", flexDirection: "column",
                height:"260px" ,  
                width: "300px",
                padding: "20px",
                marginTop: -300, 
                marginLeft: -80
                }}>
            <input 
             className="mi-input"
             style ={{marginBottom: "10px", padding: "8px",border: "none",outline: "none",background: "transparent",fontSize: "20px",fontFamily: 'Lilita One',fontWeight: "bold"    }}
             placeholder="Objetivo" />
            <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Objetivo principal" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Tiempo estimado" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="N° sesiones por semana" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Tiempo por sesion" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Descansos" />
          </div>
          <div style={{
                position: "absolute", 
                height: "450px",
                width: "2px",
                backgroundColor: "black",
                marginTop: -320,
                marginLeft: 290
                }}></div>
    <div style={{ 
                // Centra horizontalmente dentro del contenedor
                display: "flex", flexDirection: "column",
                height:"260px" ,  
                width: "300px",
                padding: "20px",
                marginTop: -300, 
                marginLeft:350
                }}>
            <input
             className="mi-input"
             style ={{width: "250px",marginBottom: "10px", padding: "8px",border: "none",outline: "none",background: "transparent",fontSize: "20px",fontFamily: 'Lilita One',fontWeight: "bold"   }}
             placeholder="Historial/ Condicion" />
            <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Experiencia" />
            <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Nivel de fuerza" />
            <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Nivel de resistencia" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Movimiento/Flexibilidad" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Lesion/Trauma" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Tipo de cuerpo" />
          </div>
          </div>
    
    );
  }

export default DiagnosticoBox;
