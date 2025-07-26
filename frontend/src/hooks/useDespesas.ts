import { useEffect, useState } from 'react';
import api from '../services/api';
import { Despesa } from '@/types/despesa';

export default function useDespesas(id: number, ano: string, mes: string, pagina: number) {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/deputados/${id}/despesas`, {
          params: { ano, mes, pagina, itens: 10 },
        });

        setDespesas(data.dados);
        setTotalPaginas(Math.ceil(data.total / 10));
      } catch (error) {
        console.error('Erro ao carregar despesas', error);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [id, ano, mes, pagina]);

  return { despesas, loading, totalPaginas };
}
