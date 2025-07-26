import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/services/api';

type Despesa = {
  tipoDespesa: string;
  dataDocumento: string;
  valorDocumento: number;
};

type Deputado = {
  id: number;
  nome: string;
  sigla_partido: string;
  sigla_uf: string;
  url_foto: string;
  status: string;
};

export default function useDeputadoDetalhe() {
  const { id } = useParams();
  const [deputado, setDeputado] = useState<Deputado | null>(null);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: '',
    dataInicio: '',
    dataFim: '',
    valorMin: '',
    valorMax: '',
  });

  useEffect(() => {
    const carregarDeputado = async () => {
      try {
        const res = await api.get(`/deputados/${id}`);
        setDeputado(res.data);
      } catch (err) {
        console.error('Erro ao carregar deputado:', err);
      }
    };

    carregarDeputado();
  }, [id]);

  useEffect(() => {
    const carregarDespesas = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/deputados/${id}/despesas`, {
          params: { pagina },
        });
        setDespesas(res.data.dados || []);
        setTotalPaginas(res.data.links?.last?.page || 1);
      } catch (err) {
        console.error('Erro ao carregar despesas:', err);
      } finally {
        setLoading(false);
      }
    };

    carregarDespesas();
  }, [id, pagina]);

  const despesasFiltradas = despesas.filter((d) => {
    const tipoMatch = filtros.tipo ? d.tipoDespesa.includes(filtros.tipo) : true;
    const data = new Date(d.dataDocumento);
    const inicio = filtros.dataInicio ? new Date(filtros.dataInicio) : null;
    const fim = filtros.dataFim ? new Date(filtros.dataFim) : null;
    const dataMatch = (!inicio || data >= inicio) && (!fim || data <= fim);
    const valorMatch =
      (!filtros.valorMin || d.valorDocumento >= parseFloat(filtros.valorMin)) &&
      (!filtros.valorMax || d.valorDocumento <= parseFloat(filtros.valorMax));
    return tipoMatch && dataMatch && valorMatch;
  });

  return {
    deputado,
    despesasFiltradas,
    filtros,
    setFiltros,
    pagina,
    setPagina,
    totalPaginas,
    loading,
  };
}
