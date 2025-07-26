//frontend/src/pages/Deputados.tsx
import React from 'react';
import useDeputados from '../hooks/useDeputados';
import SearchInput from '../components/ui/SearchInput/SearchInput';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import ErrorMessage from '../components/ui/ErrorMessage';
import Pagination from '../components/ui/Pagination';
import DeputadoCard from '../components/CardDeputado/';
import FiltroDeputados from '@/components/FiltroDeputados/';
import styles from './Deputados.module.scss';

export default function Deputados() {
  const {
    deputados,
    pagina,
    setPagina,
    busca,
    setBusca,
    totalPaginas,
    loading,
    error,
    filtros,
    setFiltros,
    partidos,
    ufs
  } = useDeputados();

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPagina(1);
  };

  return (
    <div className={styles.container}>
        <div className={styles.header}> 
            <h1 className={styles.title}>Lista de Deputados</h1>
       </div>

      <div className={styles.searchContainer}>
        <SearchInput
          value={busca}
          onChange={handleBuscar}
          placeholder="Buscar por nome..."
          disabled={loading}
        />
        <FiltroDeputados
            partido={filtros.partido}
            uf={filtros.uf}
            partidos={partidos}
            ufs={ufs}
            onChange={setFiltros}
        />
      </div>

      {loading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {deputados.length === 0 ? (
            <p className={styles.noResults}>Nenhum deputado encontrado</p>
          ) : (
            <ul className={styles.list}>
              {deputados.map(dep => (
                <DeputadoCard key={dep.id} deputado={dep} />
              ))}
            </ul>
          )}

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
