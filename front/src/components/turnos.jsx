import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Turnos() {

    // Estado para los turnos guardados
    const [turnos, setTurnos] = useState(() => {
        const guardados = localStorage.getItem("turnos");
        return guardados ? JSON.parse(guardados) : [];
    });

    // Estados para el formulario
    const [nombre, setNombre] = useState("");
    const [especialidad, setEspecialidad] = useState("Medicina General");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    // Guardar los turnos en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("turnos", JSON.stringify(turnos));
    }, [turnos]);

    // Función para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !fecha || !hora) {
            alert("Por favor, completá todos los campos.");
            return;
        }


        const nuevoTurno = {
            id: Date.now(),
            nombre,
            especialidad,
            fecha,
            hora
        };

        setTurnos([...turnos, nuevoTurno]);

        setNombre("");
        setEspecialidad("");
        setFecha("");
        setHora("");
    };

    // Función para eliminar un turno
    const eliminarTurno = (id) => {
        const nuevos = turnos.filter((t) => t.id !== id);
        setTurnos(nuevos);
    };


    return (
        <div className="turnos-page">

            <header className="header">
                <div className="logo">
                    <img src="imag/logoSF.png" alt="Logo Clínica" />
                </div>

                <nav className="navbar">
                    <Link to="/home">
                        <button>Inicio</button>
                    </Link>
                    <Link to="/servicios">
                        <button>Servicios</button>
                    </Link>
                    <Link to="/turnos">
                        <button>Turnos</button>
                    </Link>
                    <p className="texto">

                        <Link to="/login" className="link">Cerrar Sesion</Link>
                    </p>
                </nav>

            </header>

            <main className="turnos-main">
                <h1>Gestión de Turnos</h1>
                <p>Seleccioná la especialidad y el horario que prefieras.</p>

                <div className="turnos-container">
                    <form className="turnos-form" onSubmit={handleSubmit}>
                        <label>
                            Nombre y apellido:
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ej: Juan Pérez"
                            />
                        </label>

                        <label>
                            Fecha:
                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </label>

                        <label>
                            Hora:
                            <input
                                type="time"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                            />
                        </label>

                        <button type="submit">Reservar turno</button>
                    </form>
                </div>

                <section className="turnos-lista">
                    <h2>Turnos agendados</h2>
                    {turnos.length === 0 ? (
                        <p>No hay turnos registrados aún.</p>
                    ) : (
                        <ul>
                            {turnos.map((t) => (

                                <li key={t.id} className="turno-card">


                                    <ul>
                                        <li>             <strong>Paciente:</strong> {t.nombre} </li>
                                        <li>     <strong>Especialidad:</strong> {t.especialidad} </li>
                                        <li> <strong>Fecha:</strong> {t.fecha} </li>
                                        <li> <strong>Hora:</strong> {t.hora}</li>

                                        <li>     <button onClick={() => eliminarTurno(t.id)} > Eliminar</button>  </li>
                                    </ul>

                                    <img
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
            <footer className="footer">

            </footer>
        </div>
    );
}

export default Turnos;