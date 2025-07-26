import React, { useState, useEffect } from 'react';
import styles from './FiltrosDespesas.module.scss';

type Filtros = {
  tipo: string;
  dataInicio: string;
  dataFim: string;
  valorMin: string;
  valorMax: string;
};

type Props = {
  filtros: Filtros;
  onChange: (filtros: Filtros) => void;
};

const filtrosIniciais: Filtros = {
  tipo: '',
  dataInicio: '',
  dataFim: '',
  valorMin: '',
  valorMax: '',
};

export default function FiltrosDespesas({ filtros, onChange }: Props) {
  const [tempFiltros, setTempFiltros] = useState(filtros);

  useEffect(() => {
    setTempFiltros(filtros);
  }, [filtros]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTempFiltros({ ...tempFiltros, [e.target.name]: e.target.value });
  };

  const handleAplicar = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(tempFiltros);
  };

  const handleLimpar = () => {
    setTempFiltros(filtrosIniciais);
    onChange(filtrosIniciais);
  };

  return (
    <form className={styles.filtrosWrapper} onSubmit={handleAplicar}>
      <fieldset className={styles.filtrosFieldset}>
        <legend>Filtros de Despesas</legend>

        <div className={styles.filtrosGrid}>
          <div className={styles.filtroItem}>
            <label>Tipo de Despesa</label>
            <input
              type="text"
              name="tipo"
              value={tempFiltros.tipo}
              onChange={handleChange}
              placeholder="Ex: Passagens"
            />
          </div>

          <div className={styles.filtroItem}>
            <label>Data Início</label>
            <input
              type="date"
              name="dataInicio"
              value={tempFiltros.dataInicio}
              onChange={handleChange}
            />
          </div>

          <div className={styles.filtroItem}>
            <label>Data Fim</label>
            <input
              type="date"
              name="dataFim"
              value={tempFiltros.dataFim}
              onChange={handleChange}
            />
          </div>

          <div className={styles.filtroItem}>
            <label>Valor Mínimo</label>
            <input
              type="number"
              name="valorMin"
              value={tempFiltros.valorMin}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className={styles.filtroItem}>
            <label>Valor Máximo</label>
            <input
              type="number"
              name="valorMax"
              value={tempFiltros.valorMax}
              onChange={handleChange}
              step="0.01"
            />
          </div>
        </div>

        <div className={styles.filtroBotoes}>
          <button type="submit" className={styles.botaoAplicar}>Aplicar Filtros</button>
          <button type="button" className={styles.botaoLimpar} onClick={handleLimpar}>
            Limpar Filtros
          </button>
        </div>
      </fieldset>
    </form>
  );
}
