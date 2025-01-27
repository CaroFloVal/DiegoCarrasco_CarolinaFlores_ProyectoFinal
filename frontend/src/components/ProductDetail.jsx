import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import img1 from '../assets/img/img1.jpg';
import img2 from '../assets/img/img2.jpg';
import img3 from '../assets/img/img3.jpg';

const products = [
  { id: 1, name: 'Colchón Premium', image: img1, price: '$200', description: 'Colchón premium para máxima comodidad.' },
  { id: 2, name: 'Colchón Económico', image: img2, price: '$150', description: 'Colchón económico para descanso adecuado.' },
  { id: 3, name: 'Colchón Ergonómico', image: img3, price: '$180', description: 'Colchón ergonómico para máximo confort.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((product) => product.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container text-light py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ objectFit: 'cover', height: '400px' }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p><strong>Precio: </strong>{product.price}</p>
          <p>{product.description}</p>
          <button className="btn btn-success">Agregar al Carrito</button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
