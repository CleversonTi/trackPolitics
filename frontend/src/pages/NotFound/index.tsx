import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
import notFoundImage from '@/assets/img/404.svg'; // ajuste o caminho conforme necessário

export default function NotFound() {
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="Página não encontrada" className={styles.image} />
      <h1>404</h1>
      <p>Ops! Página não encontrada.</p>
      <Link to="/">← Voltar para a página inicial</Link>
    </div>
  );
}
