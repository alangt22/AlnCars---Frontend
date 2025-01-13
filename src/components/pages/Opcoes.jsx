import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Opcoes.module.css'; 
import carro from './../../assets/img/car1.jpg'
import rodas from './../../assets/img/roda1.jpg'

const Opcoes = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1>Carros</h1>
        <Link to="/home">
          <img src={carro} alt="Carro" />
        </Link>
      </div>
      <div className={styles.item}>
      <h1>Rodas</h1>
        <Link to="/rodas">
          <img src={rodas} alt="Rodas" />
        </Link>
      </div>
    </div>
  );
}

export default Opcoes;
