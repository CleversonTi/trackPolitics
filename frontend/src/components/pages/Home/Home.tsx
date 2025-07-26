import React from 'react';
import { Button } from '../../components/Button/Button';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Bem-vindo</h1>
      
      <div className={styles.home__content}>
        <Button onClick={() => console.log('Clicado!')}>
          Botão Primário
        </Button>
        <Button variant="secondary">
          Botão Secundário
        </Button>
      </div>
    </div>
  );
};