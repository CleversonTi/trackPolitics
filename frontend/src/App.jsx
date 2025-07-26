// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import Deputados from './pages/Deputados';
import DeputadoDetalhe from '@/components/pages/DeputadoDetalhe/'; // <-- nova página

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Deputados />} />
          <Route path="/deputados/:id" element={<DeputadoDetalhe />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
