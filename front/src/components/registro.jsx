import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [dni, setDni] = useState('');
    const [rol, setRol] = useState('usuario');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        // Validaciones en el cliente
        if (email.trim() === '' || contraseña.trim() === '' || dni.trim() === '') {
            setError('Por favor completa todos los campos');
            setLoading(false);
            return;
        }
        
        if (contraseña.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }
        if (dni.length !== 8) {
            setError('El DNI debe tener 8 caracteres');
            setLoading(false);
            return;
        }
        
        try {
            await api.post('/registro', { email, contraseña, rol, dni });
            alert('Registro exitoso. Inicia sesión ahora.');
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.error || error.message || 'Error en el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registro-container">
            <h2>Crear Cuenta</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                    <input
                    placeholder='email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                    placeholder='contraseña'
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                    <input
                    placeholder='dni'
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        required
                    />
                <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
            </form>
            <p><Link to="/">¿Ya tienes cuenta? Inicia sesión aquí</Link></p>
        </div>
    );
};

export default Registro;
