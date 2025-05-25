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
            <select style={inputStyle}>
                    <option value="">Sexo</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                </select>
            <select style={inputStyle}>
                <option value="">Índice de Masa Corporal(IMC) </option>
                {Array.from({ length: 201 }, (_, i) => (14.2 + i * 0.1).toFixed(1)).map((imc) => (
                    <option key={imc} value={imc}>{imc} m</option>
                ))}
            </select>
            <select style={inputStyle}>
                <option value="">Porcentaje grasa corporal</option>
                {[...Array(31)].map((_, i) => (
                    <option key={i + 5 } value={i + 5}>{i + 5} %</option>
                ))}
            </select>
            <select style={inputStyle}>
                    <option value="">Actividad física</option>
                    <option value="sedentario">Sedentario</option>
                    <option value="ligera">Ligera</option>
                    <option value="moderada">Moderada</option>
                    <option value="intensa">Intensa</option>
                </select>
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
            <select style={inputStyle}>
                <option value="">Tiempo estimado </option>
                {Array.from({ length: 19 }, (_, i) => (30 + i * 10)).map((imc) => (
                    <option key={imc} value={imc}>{imc} min</option>
                ))}
            </select>
            <select style={inputStyle}>
                <option value="">N° sesiones por semana</option>
                {[...Array(6)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <select style={inputStyle}>
                <option value="">Tiempo por sesion </option>
                {Array.from({ length: 19 }, (_, i) => (30 + i * 10)).map((imc) => (
                    <option key={imc} value={imc}>{imc} min</option>
                ))}
            </select>
            <select style={inputStyle}>
                <option value="">Descansos</option>
                {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} min</option>
                ))}
            </select>
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
            <select style={inputStyle}>
                    <option value="">Experiencia</option>
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                </select>
            <select style={inputStyle}>
                    <option value="">Nivel de fuerza</option>
                    <option value="bajo">Bajo</option>
                    <option value="medio">Medio</option>
                    <option value="alto">Alto</option>
                </select>
            <select style={inputStyle}>
                    <option value="">Nivel de resistencia</option>
                    <option value="bajo">Bajo</option>
                    <option value="medio">Medio</option>
                    <option value="alto">Alto</option>
                </select>
            <select style={inputStyle}>
                    <option value="">Movimiento / Flexibilidad</option>
                    <option value="limitado">Limitado</option>
                    <option value="normal">Normal</option>
                    <option value="excelente">Excelente</option>
                </select>
             <input 
             style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
             placeholder="Lesion/Trauma" />
            <select style={inputStyle}>
                    <option value="">Tipo de cuerpo</option>
                    <option value="ectomorfo">Ectomorfo</option>
                    <option value="mesomorfo">Mesomorfo</option>
                    <option value="endomorfo">Endomorfo</option>
                </select>
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
