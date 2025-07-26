import React from 'react';
import { Despesa } from '@/types/despesa';

type Props = {
  despesas: Despesa[];
};

export default function DespesasList({ despesas }: Props) {
  if (!despesas.length) return <p>Nenhuma despesa encontrada.</p>;

  return (
    <ul>
      {despesas.map((d) => (
        <li key={d.id}>
          <strong>{d.tipoDespesa}</strong> - {d.fornecedor} - R$ {d.valorDocumento.toFixed(2)} em {new Date(d.dataDocumento).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
