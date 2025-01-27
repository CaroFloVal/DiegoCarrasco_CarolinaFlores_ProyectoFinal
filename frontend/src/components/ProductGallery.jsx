import React from 'react';
import { Link } from 'react-router-dom';

import img1 from '../assets/img/img1.jpg';
import img2 from '../assets/img/img2.jpg';
import img3 from '../assets/img/img3.jpg';
import img4 from '../assets/img/img4.jpg';
import img5 from '../assets/img/img5.jpg';
import img6 from '../assets/img/img1.jpg'; // Actualiza la ruta según corresponda

const products = [
  { id: 1, name: 'Colchón Premium', image: img1, price: '$200' },
  { id: 2, name: 'Colchón Económico', image: img2, price: '$150' },
  { id: 3, name: 'Colchón Ergonómico', image: img3, price: '$180' },
  { id: 4, name: 'Colchón Ergonómico', image: img4, price: '$210' },
  { id: 5, name: 'Colchón Ergonómico', image: img5, price: '$230' },
  { id: 6, name: 'Colchón Ergonómico', image: img6, price: '$220' },
];

const ProductGallery = () => {
  return (
    <section className="container-fluid text-light py-5" style={{ backgroundImage: "url('../assets/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="text-center mb-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '2rem', borderRadius: '8px' }}>
        <h1 className="mb-3">Nuestro Compromiso</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          En <strong>Nancy Angulo Colchones</strong>, nos dedicamos a brindar la máxima comodidad a los transportistas, entendiendo el arduo trabajo y largas horas en la carretera. Nuestros productos están diseñados para garantizar descanso y confort, porque sabemos que un transportista descansado es un transportista seguro.
        </p>
      </div>

      <h2 className="section-title text-center mt-5">Nuestros Colchones</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top img-fluid"
                alt={product.name}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-success">Agregar</button>
                
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGallery;
