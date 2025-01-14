import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Rodas() {
  const [rodas, setRodas] = useState([]);
  const [filteredRodas, setFilteredRodas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  // Carousel component for displaying roda images
  const CarCarousel = ({ roda, onNext, onPrev }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roda.images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + roda.images.length) % roda.images.length);
    };

    return (
      <div className={styles.carousel_container}>
        <button
          className={`${styles.carousel_button} ${styles.prev}`}
          onClick={prevImage}
        >
          &#10094;
        </button>
        {roda.images && roda.images.length > 0 && (
          <div
            style={{
              backgroundImage: `url(${import.meta.env.VITE_API_URL}/images/rodas/${roda.images[currentIndex]})`,
            }}
            className={styles.car_card_image}
          ></div>
        )}
        <button
          className={`${styles.carousel_button} ${styles.next}`}
          onClick={nextImage}
        >
          &#10095;
        </button>
      </div>
    );
  };

  // Fetch rodas from the API
  useEffect(() => {
    api.get('/rodas').then((response) => {
      const carsWithIndex = response.data.rodas.map((roda) => ({
        ...roda,
        currentIndex: 0,
      }));
      setRodas(carsWithIndex);
      setFilteredRodas(carsWithIndex);
      setIsLoading(false); 
    })
    .catch((error) => {
      console.error("Erro ao carregar rodas:", error)
      setIsLoading(false); 
    })
  }, []);

  // Render the list of rodas
  return (
    <section>
      <div className={styles.car_home_header}>
        <h1>
          <span className="bold">Rodas à Venda:</span> Encontre o Seu Ideal Aqui
        </h1>
                <Link className={styles.back} to={'/'}>Voltar</Link>
        <p>
          Explore nossa variedade de carros de todas as marcas, com opções para todos os gostos e orçamentos. Encontre seu próximo carro hoje mesmo.
        </p>
      </div>
      <div className={styles.car_container}>
      {isLoading ? (
          <div className={styles.loader}>
            <div className={styles.spinner}></div> {/* Bolinha girando */}
          </div>
      ) : (
        <>
        {filteredRodas.length > 0 ? (
          filteredRodas.map((roda) => (
            <div key={roda._id} className={styles.car_card}>
              <CarCarousel roda={roda} />
              <h4>{roda.name}</h4>
              <p>
                <span className="bold">Preço:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(roda.price)}
              </p>
              <p><span className="bold">Localidade:</span> {roda.location}</p>
              {roda.available ? (
                <Link to={`/rodas/${roda._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Vendido</p>
              )}
            </div>
          ))
        ) : (
          <p>Não há carros cadastrados ou disponíveis para compra no momento!</p>
        )}
        </>
      )}
      </div>
    </section>
  );
}

export default Rodas;
