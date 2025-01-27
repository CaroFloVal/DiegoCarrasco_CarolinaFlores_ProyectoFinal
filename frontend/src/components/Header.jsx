import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Colchones a Medida
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/productos">  {}
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">  {}
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">  {}
                  Registrarse
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                   Iniciar Sesión
                </Link>
</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
