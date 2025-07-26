import React from 'react';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Dados Abertos da Câmara dos Deputados</p>
    </footer>
  );
}
