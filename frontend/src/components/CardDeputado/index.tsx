//frontend/src/components/CardDeputado/index.tsx
import React from 'react';
import { Deputado } from '@/types/deputado';
import styles from './CardDeputado.module.scss';

type DeputadoCardProps = {
  deputado: Deputado;
};

export default function DeputadoCard({ deputado }: DeputadoCardProps) {
  return (
    <li className={styles.card}>
      <img src={deputado.url_foto} alt={deputado.nome} className={styles.foto} />

      <div className={styles.info}>
        <div className={styles.nomeLinha}>
          <strong>
            {deputado.nome} <span>({deputado.sigla_partido} - {deputado.sigla_uf})</span>
          </strong>
          <span className={`${styles.badge} ${deputado.status === 'Exercício' ? styles.ativo : styles.licenciado}`}>
            {deputado.status === 'Exercício' ? 'Em exercício' : 'Licenciado'}
          </span>
        </div>

        
      </div>
    </li>
  );
}