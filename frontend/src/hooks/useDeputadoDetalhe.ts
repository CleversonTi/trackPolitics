import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/services/api';

type Despesa = {
  tipo_despesa: string;
  data_documento: string;
  valor_documento: number;
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

      const resposta = res.data;
     
      if (Array.isArray(resposta.dados)) {
        setDespesas(resposta.dados);
        setTotalPaginas(resposta.links?.last?.page || 1);
      } else {
        console.warn('❌ Esperava array em resposta.dados, recebeu:', resposta);
        setDespesas([]);
      }
    } catch (err) {
      console.error('Erro ao carregar despesas:', err);
      setDespesas([]);
    } finally {
      setLoading(false);
    }
  };

  carregarDespesas();
}, [id, pagina]);

  const despesasFiltradas = despesas.filter((d) => {
    const tipoMatch = filtros.tipo ? d.tipo_despesa.includes(filtros.tipo) : true;
    const data = new Date(d.data_documento);
    const inicio = filtros.dataInicio ? new Date(filtros.dataInicio) : null;
    const fim = filtros.dataFim ? new Date(filtros.dataFim) : null;
    const dataMatch = (!inicio || data >= inicio) && (!fim || data <= fim);
    const valorMatch =
      (!filtros.valorMin || d.valor_documento >= parseFloat(filtros.valorMin)) &&
      (!filtros.valorMax || d.valor_documento <= parseFloat(filtros.valorMax));
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
