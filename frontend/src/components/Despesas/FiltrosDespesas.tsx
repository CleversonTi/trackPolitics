import React from 'react';
import styles from './FiltrosDespesas.module.scss';

type Props = {
  filtros: {
    tipo: string;
    dataInicio: string;
    dataFim: string;
    valorMin: string;
    valorMax: string;
  };
  onChange: (filtros: Props['filtros']) => void;
};

export default function FiltrosDespesas({ filtros, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.filtrosWrapper}>
      <div className={styles.filtroItem}>
        <label>Tipo de Despesa</label>
        <input
          type="text"
          name="tipo"
          value={filtros.tipo}
          onChange={handleChange}
          placeholder="Ex: Passagens, Alimentação..."
        />
      </div>

      <div className={styles.filtroItem}>
        <label>Data Início</label>
        <input
          type="date"
          name="dataInicio"
          value={filtros.dataInicio}
          onChange={handleChange}
        />
      </div>

      <div className={styles.filtroItem}>
        <label>Data Fim</label>
        <input
          type="date"
          name="dataFim"
          value={filtros.dataFim}
          onChange={handleChange}
        />
      </div>

      <div className={styles.filtroItem}>
        <label>Valor Mínimo</label>
        <input
          type="number"
          name="valorMin"
          value={filtros.valorMin}
          onChange={handleChange}
          step="0.01"
        />
      </div>

      <div className={styles.filtroItem}>
        <label>Valor Máximo</label>
        <input
          type="number"
          name="valorMax"
          value={filtros.valorMax}
          onChange={handleChange}
          step="0.01"
        />
      </div>
    </div>
  );
}
