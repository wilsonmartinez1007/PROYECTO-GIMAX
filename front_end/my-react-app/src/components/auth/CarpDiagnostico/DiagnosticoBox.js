
import React, { useState } from "react";
import "./Diagnostico.css"
//cambio
function DiagnosticoBox({onDiagnostico}) {
    const [edad, setEdad] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [sexo, setSexo] = useState("");
    const [imc, setImc] = useState("");
    const [grasaCor, setGrasaCo] = useState("");
    const [acFisica, setAcFisica] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [tiempoEstimado, setTiempoEstimando] = useState("");
    const [cantSesiones, setCantSesiones] = useState("");
    const [tiempoPorSesion, setTiempoPorSesion] = useState("");
    const [descansos, setDescansos] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [nivelFuerza, setNivelFuerza] = useState("");
    const [nivelResistencia, setNivelResistencia] = useState("");
    const [movimiento, setMovimiento] = useState("");
    const [lesion, setLesion] = useState("");
    const [tipoCuerpo, setTipoCuerpo] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();

    onDiagnostico(edad,peso,altura,sexo,imc, grasaCor, acFisica, objetivo, tiempoEstimado, cantSesiones,
        tiempoPorSesion, descansos, experiencia, nivelFuerza, nivelResistencia, movimiento, lesion, tipoCuerpo);

         };

   
    return (
        <div style={{ height:"0vh"}}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
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
                <select style={inputStyle}
                    onChange={(e) => setEdad(e.target.value)}>
                    <option value="">Edad</option>
                    {[...Array(61)].map((_, i) => (
                        <option key={i + 10} value={i + 10}>{i + 10}</option>
                    ))}
                </select>
                <select style={inputStyle}
                    onChange={(e) => setPeso(e.target.value)}>
                    <option value="">Peso</option>
                    {[...Array(91)].map((_, i) => (
                        <option key={i + 30} value={i + 30}>{i + 30}</option>
                    ))}
                </select>
                <select style={inputStyle}
                    onChange={(e) => setAltura(e.target.value)}>
                    <option value="">Altura</option>
                    {Array.from({ length: 71 }, (_, i) => (1.40 + i * 0.01).toFixed(2)).map((altura) => (
                        <option key={altura} value={altura}>{altura} m</option>
                    ))}
                </select>
                <select style={inputStyle}
                        onChange={(e) => setSexo(e.target.value)}>
                        <option value="">Sexo</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                <select style={inputStyle}
                    onChange={(e) => setImc(e.target.value)}>
                    <option value="">Índice de Masa Corporal(IMC) </option>
                    {Array.from({ length: 201 }, (_, i) => (14.2 + i * 0.1).toFixed(1)).map((imc) => (
                        <option key={imc} value={imc}>{imc} m</option>
                    ))}
                </select>
                <select style={inputStyle}
                    onChange={(e) => setGrasaCo(e.target.value)}>
                    <option value="">Porcentaje grasa corporal</option>
                    {[...Array(31)].map((_, i) => (
                        <option key={i + 5 } value={i + 5}>{i + 5} %</option>
                    ))}
                </select>
                <select style={inputStyle}
                        onChange={(e) => setAcFisica(e.target.value)}>
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
                    marginTop: 150,
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
                onChange={(e) => setObjetivo(e.target.value)} 
                style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
                placeholder="Objetivo principal" />
                <select style={inputStyle}
                    onChange={(e) => setTiempoEstimando(e.target.value)}>
                    <option value="">Tiempo estimado </option>
                    {Array.from({ length: 19 }, (_, i) => (30 + i * 10)).map((imc) => (
                        <option key={imc} value={imc}>{imc} min</option>
                    ))}
                </select>
                <select style={inputStyle}
                    onChange={(e) => setCantSesiones(e.target.value)}>
                    <option value="">N° sesiones por semana</option>
                    {[...Array(6)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <select style={inputStyle}
                    onChange={(e) => setTiempoPorSesion(e.target.value)}>
                    <option value="">Tiempo por sesion </option>
                    {Array.from({ length: 19 }, (_, i) => (30 + i * 10)).map((imc) => (
                        <option key={imc} value={imc}>{imc} min</option>
                    ))}
                </select>
                <select style={inputStyle}
                    onChange={(e) => setDescansos(e.target.value)}>
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
                    marginTop: 150,
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
                <select style={inputStyle}
                        onChange={(e) => setExperiencia(e.target.value)}>
                        <option value="">Experiencia</option>
                        <option value="principiante">Principiante</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                    </select>
                <select style={inputStyle}
                        onChange={(e) => setNivelFuerza(e.target.value)}>
                        <option value="">Nivel de fuerza</option>
                        <option value="bajo">Bajo</option>
                        <option value="medio">Medio</option>
                        <option value="alto">Alto</option>
                    </select>
                <select style={inputStyle}
                        onChange={(e) => setNivelResistencia(e.target.value)}>
                        <option value="">Nivel de resistencia</option>
                        <option value="bajo">Bajo</option>
                        <option value="medio">Medio</option>
                        <option value="alto">Alto</option>
                    </select>
                <select style={inputStyle}
                        onChange={(e) => setMovimiento(e.target.value)}>
                        <option value="">Movimiento / Flexibilidad</option>
                        <option value="limitado">Limitado</option>
                        <option value="normal">Normal</option>
                        <option value="excelente">Excelente</option>
                    </select>
                <input 
                onChange={(e) => setLesion(e.target.value)}
                style ={{width: "250px",marginBottom: "10px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
                placeholder="Lesion/Trauma" />
                <select style={inputStyle}
                        onChange={(e) => setTipoCuerpo(e.target.value)}>
                        <option value="">Tipo de cuerpo</option>
                        <option value="ectomorfo">Ectomorfo</option>
                        <option value="mesomorfo">Mesomorfo</option>
                        <option value="endomorfo">Endomorfo</option>
                    </select>
            </div>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
                type="submit" 
                style={{position: "absolute",zIndex: 1,marginTop: 640, marginLeft: -50,marginBottom: "10px",padding: "6px", borderRadius: 10, border: "none", width: "105px" }}>
                Guardar
       </button>
            </form>
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
