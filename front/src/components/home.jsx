import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuarioActual(JSON.parse(usuarioGuardado));
    }
  }, []);

  const rol = usuarioActual?.rol || 'usuario';

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ marginBottom: '30px' }}>
        <Link to="/logout" style={{ padding: '10px 20px', backgroundColor: '#ff4444', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Cerrar Sesión
        </Link>
      </div>
       <div style={{ marginBottom: '30px' }}>
        <Link to="/turnos" style={{ padding: '10px 20px', backgroundColor: '#0c08c4', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          turnos
        </Link>
      </div>
      
      <h1>¡Bienvenido {rol.charAt(0).toUpperCase() + rol.slice(1)}!</h1>
      
      {usuarioActual && (
        <p style={{ fontSize: '18px', color: '#666' }}>
          Email: <strong>{usuarioActual.email}</strong>
        </p>
      )}
    </div>
  );
};

export default Home;
