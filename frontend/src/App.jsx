import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [deputados, setDeputados] = useState([]);

  useEffect(() => {
    api.get('/deputados') // Vai acessar: http://jobs_retta:8000/api/deputados
      .then(response => setDeputados(response.data))
      .catch(error => console.error("Erro ao buscar deputados", error));
  }, []);

  return (
    <div>
      <h1>Lista de Deputados</h1>
      <ul>
        {deputados.map(dep => (
          <li key={dep.id}>{dep.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
