//frontend/src/hooks/useDeputados.ts
import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { Deputado, ApiResponse } from '../types/deputado';

export default function useDeputados() {
  const [deputados, setDeputados] = useState<Deputado[]>([]);
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [filtros, setFiltros] = useState({ partido: '', uf: '' });
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const carregarDeputados = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get<ApiResponse>('/deputados', {
          params: { 
            page: pagina, 
            busca: busca.trim() || undefined 
          },
          signal: abortController.signal
        });

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('Estrutura de dados inválida da API');
        }

        setDeputados(response.data.data);
        setTotalPaginas(response.data.last_page);
      } catch (err) {
        if (!abortController.signal.aborted) {
          const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
          setError(`Erro ao carregar deputados: ${errorMsg}`);
          setDeputados([]);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    carregarDeputados();

    return () => abortController.abort();
  }, [pagina, busca]);

  const partidos = useMemo(() => {
    return [...new Set(deputados.map(dep => dep.sigla_partido))].sort();
  }, [deputados]);

  const ufs = useMemo(() => {
    return [...new Set(deputados.map(dep => dep.sigla_uf))].sort();
  }, [deputados]);

  const deputadosFiltrados = useMemo(() => {
    return deputados.filter(dep => {
      const filtroPartido = filtros.partido ? dep.sigla_partido === filtros.partido : true;
      const filtroUf = filtros.uf ? dep.sigla_uf === filtros.uf : true;
      return filtroPartido && filtroUf;
    });
  }, [deputados, filtros]);

  return {
    deputados: deputadosFiltrados,
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
  };
}
