//frontend/src/components/pages/DeputadoDetalhe/index.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FiltrosDespesas from '@/components/Despesas/FiltrosDespesas';
import TabelaDespesas from '@/components/Despesas/TabelaDespesas';
import Pagination from '@/components/ui/Pagination';
import useDeputadoDetalhe from '@/hooks/useDeputadoDetalhe';


import styles from './DeputadoDetalhe.module.scss';

export default function DeputadoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
        deputado,
        despesasFiltradas,
        filtros,
        setFiltros,
        pagina,
        setPagina,
        totalPaginas,
        loading
    } = useDeputadoDetalhe();

  if (!deputado) return <p>Carregando deputado...</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/deputados')} className={styles.botaoVoltar}>
        ← Voltar
      </button>

      <div className={styles.deputadoInfo}>
        <img src={deputado.url_foto} alt={deputado.nome} className={styles.foto} />
        <div>
          <h2>{deputado.nome}</h2>
          <p>{deputado.sigla_partido} - {deputado.sigla_uf}</p>
          <p>Status: {deputado.status}</p>
        </div>
      </div>

      <h3>Filtrar Despesas</h3>
      <FiltrosDespesas filtros={filtros} onChange={setFiltros} />

      <h3>Despesas</h3>
      {loading ? (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando despesas...</p>
        </div>
        ) : (
        <>
          <TabelaDespesas despesas={despesasFiltradas} />
          <Pagination
            currentPage={pagina}
            totalPages={totalPaginas}
            onPageChange={setPagina}
            disabled={loading}
          />
        </>
      )}
    </div>
  );
}
