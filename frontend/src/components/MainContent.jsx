import React from 'react';
import ProductGallery from './ProductGallery';
import ContactForm from './ContactForm';

const MainContent = () => {
  return (
    <main className="container my-5">
      <section id="productos" className="mb-5">
        <ProductGallery />
      </section>
      <section id="contacto">
        <ContactForm />
      </section>
    </main>
  );
};

export default MainContent;
