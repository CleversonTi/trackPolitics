// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import Home from '@/pages/Home/';
import Deputados from '@/pages/Deputados';
import DeputadoDetalhe from '@/components/pages/DeputadoDetalhe';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <>
    <div className="content_principal">
      
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deputados" element={<Deputados />} />
          <Route path="/deputados/:id" element={<DeputadoDetalhe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
     
      </div>
    </>
  );
}

export default App;
