import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import ContactForm from './components/ContactForm';
import ProductGallery from './components/ProductGallery';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProductDetail from './components/ProductDetail';
import AdminProducts from './components/AdminProducts'; 
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; 
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<MainContent />} />
            <Route path="/productos" element={<ProductGallery />} />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Rutas protegidas */}
            <Route
              path="/admin/products"
              element={
                <PrivateRoute>
                  <AdminProducts />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
