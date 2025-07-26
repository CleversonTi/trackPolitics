// frontend/src/components/pages/DeputadoDetalhe/index.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/services/api';
import FiltrosDespesas from '@/components/Despesas/FiltrosDespesas';
import TabelaDespesas from '@/components/Despesas/TabelaDespesas';
import Pagination from '@/components/ui/Pagination';
import styles from './DeputadoDetalhe.module.scss';

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

export default function DeputadoDetalhe() {
  const { id } = useParams();
  const [deputado, setDeputado] = useState<Deputado | null>(null);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [filtros, setFiltros] = useState({
    tipo: '',
    dataInicio: '',
    dataFim: '',
    valorMin: '',
    valorMax: '',
  });

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loadingDespesas, setLoadingDespesas] = useState(false);

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
      setLoadingDespesas(true);
      try {
        const res = await api.get(`/deputados/${id}/despesas`, {
          params: { pagina },
        });

        setDespesas(res.data.dados || []);
        setTotalPaginas(res.data.links?.last?.page || 1);
      } catch (err) {
        console.error('Erro ao carregar despesas:', err);
      } finally {
        setLoadingDespesas(false);
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

  if (!deputado) return <p>Carregando deputado...</p>;

  return (
    <div className={styles.container}>
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

      {loadingDespesas ? (
        <p>Carregando despesas...</p>
      ) : (
        <>
          <TabelaDespesas despesas={despesasFiltradas} />
          <Pagination
            currentPage={pagina}
            totalPages={totalPaginas}
            onPageChange={setPagina}
            disabled={loadingDespesas}
          />
        </>
      )}
    </div>
  );
}
