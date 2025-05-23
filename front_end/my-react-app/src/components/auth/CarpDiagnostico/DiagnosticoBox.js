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
            <select style={inputStyle}>
                <option value="">Edad</option>
                {[...Array(61)].map((_, i) => (
                    <option key={i + 10} value={i + 10}>{i + 10}</option>
                ))}
            </select>
            <select style={inputStyle}>
                <option value="">Peso</option>
                {[...Array(91)].map((_, i) => (
                    <option key={i + 30} value={i + 30}>{i + 30}</option>
                ))}
            </select>
            <select style={inputStyle}>
                <option value="">Altura</option>
                {Array.from({ length: 71 }, (_, i) => (1.40 + i * 0.01).toFixed(2)).map((altura) => (
                    <option key={altura} value={altura}>{altura} m</option>
                ))}
            </select>
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Sexo" />
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Índice de Masa Corporal(IMC)" />
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
const inputStyle = {
    width: "270px",
    marginBottom: "10px",
    padding: "8px",
    borderRadius: 20,
    background: "white",
    border: "none",
    outline: "none"

};
export default DiagnosticoBox;
