import React from 'react';
import styles from './TabelaDespesas.module.scss';

type Props = {
  despesas: {
    tipoDespesa: string;
    dataDocumento: string;
    valorDocumento: number;
  }[];
};

export default function TabelaDespesas({ despesas }: Props) {
  if (despesas.length === 0) {
    return <p className={styles.semResultados}>Nenhuma despesa encontrada.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((d, i) => (
            <tr key={i}>
              <td>{d.tipoDespesa}</td>
              <td>{new Date(d.dataDocumento).toLocaleDateString('pt-BR')}</td>
              <td className={styles.valor}>R$ {d.valorDocumento.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
