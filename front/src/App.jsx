import Home from './components/home';
import Login from './components/login';
import Registro from './components/registro';
import Logout from './components/logout';
import Turnos from './components/turnos';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Componente para proteger rutas
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
