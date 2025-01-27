import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Formulario enviado:', formData);
    alert('Registro exitoso.');
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center text-light mb-4">Formulario de Registro</h2>
          <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
            {/* Nombre Completo */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label text-light">
                Nombre Completo:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className="form-control"
                required
              />
            </div>

            {/* Correo Electrónico */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Tu correo electrónico"
                className="form-control"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea tu contraseña"
                className="form-control"
                required
              />
            </div>

            {/* Repetir Contraseña */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label text-light">
                Repetir Contraseña:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                className="form-control"
                required
              />
            </div>

            {/* Botón Enviar */}
            <button type="submit" className="btn btn-primary w-100">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
