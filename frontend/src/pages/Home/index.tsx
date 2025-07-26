// frontend/src/pages/Home/index.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Portal da Câmara</h1>
      <p>
        Acesse a lista completa de deputados:
        <br />
        <Link to="/deputados">→ Ver deputados</Link>
      </p>
    </div>
  );
}
