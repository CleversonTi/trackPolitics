// frontend/src/App.jsx
import React  from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Deputados from './pages/Deputados';


function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app">
        <Deputados />
      </div>
      <Footer />
    </div>
  );
}

export default App;
