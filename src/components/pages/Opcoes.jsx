import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Opcoes.module.css'; 
import carro from './../../assets/img/car1.jpg'
import rodas from './../../assets/img/roda1.jpg'
import { useState, useEffect } from 'react';

const Opcoes = () => {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Simula um tempo de carregamento de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false); // Após 2 segundos, o carregamento é finalizado
    }, 2000);

    // Limpeza do timer para evitar chamadas após o componente ser desmontado
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <div className={styles.spinner}></div> {/* Bolinha girando */}
        </div>
      ) : (
        <>
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
        </>
      )}
    </>
  )
}

export default Opcoes;
