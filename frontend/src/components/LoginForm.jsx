import React, { useState } from 'react';
import './LoginForm.css'; 
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener login y el estado del contexto
  const { login } = useAuth();
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login(email, password)) {
      navigate('/'); // Redirige a la página principal al iniciar sesión exitosamente
    } else {
      setErrorMessage('Correo electrónico o contraseña incorrectos');
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <button type="submit" className="btn w-100">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
