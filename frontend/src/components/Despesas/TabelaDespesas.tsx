import React from 'react';
import styles from './TabelaDespesas.module.scss';

type Despesa = {
  tipo_despesa: string;
  data_documento: string;
  valor_documento: number | string | null;
};

type Props = {
  despesas: Despesa[];
};

export default function TabelaDespesas({ despesas }: Props) {
  const total = despesas.reduce((acc, d) => acc + Number(d.valor_documento || 0), 0);


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
          {despesas.length === 0 ? (
            <tr>
              <td colSpan={3} className={styles.semResultados}>
                Nenhuma despesa encontrada.
              </td>
            </tr>
          ) : (
            despesas.map((d, i) => (
              <tr key={i}>
                <td>{d.tipo_despesa}</td>
                <td>{new Date(d.data_documento).toLocaleDateString('pt-BR')}</td>
                <td className={styles.valor}>R$ {Number(d.valor_documento || 0).toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
        {despesas.length > 0 && (
          <tfoot className={styles.tfootTotal}>
                <tr>
                    <td colSpan={2} style={{ textAlign: 'right' }}>Total:</td>
                    <td> {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                </tr>
            </tfoot>
        )}
      </table>
    </div>
  );
}
