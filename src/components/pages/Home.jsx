import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const [cars, setCars] = useState([]);

  // Função para ir para a próxima imagem de um carro específico
  const nextImage = (carId) => {
    setCars((prevState) =>
      prevState.map((car) => {
        if (car._id === carId) {
          // Incrementa o índice da imagem para o carId específico
          const nextIndex = (car.currentIndex + 1) % car.images.length;
          return { ...car, currentIndex: nextIndex }; // Atualiza o car com o novo índice
        }
        return car;
      })
    );
  };

  // Função para ir para a imagem anterior de um carro específico
  const prevImage = (carId) => {
    setCars((prevState) =>
      prevState.map((car) => {
        if (car._id === carId) {
          // Decrementa o índice da imagem para o carId específico
          const prevIndex = (car.currentIndex - 1 + car.images.length) % car.images.length;
          return { ...car, currentIndex: prevIndex }; // Atualiza o car com o novo índice
        }
        return car;
      })
    );
  };

  useEffect(() => {
    api.get('/cars').then((response) => {
      // Adiciona o campo currentIndex para cada carro
      const carsWithIndex = response.data.cars.map((car) => ({
        ...car,
        currentIndex: 0, // Inicializa o índice como 0
      }));
      setCars(carsWithIndex);
    });
  }, []);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1><span className='bold'>Carros à Venda:</span> Encontre o Seu Ideal Aqui</h1>
        <p>Explore nossa variedade de carros de todas as marcas, com opções para todos os gostos e orçamentos. Encontre seu próximo carro hoje mesmo.</p>
      </div>
      <div className={styles.pet_container}>
        {cars.length > 0 ? (
          cars.map((car) => {
            // Acessa o índice de imagem para o carro atual
            const currentIndex = car.currentIndex || 0;
            return (
              <div key={car._id} className={styles.pet_card}>
                <div className={styles.carousel_container}>
                  {/* Botões de navegação do carrossel */}
                  <button
                    className={`${styles.carousel_button} ${styles.prev}`}
                    onClick={() => prevImage(car._id)} // Navegar para a imagem anterior
                  >
                    &#10094;
                  </button>

                  {/* Exibe a imagem do carrossel com base no índice */}
                  {car.images && car.images.length > 0 && (
                    <div
                      style={{
                        backgroundImage: `url(${import.meta.env.VITE_API_URL}/images/cars/${car.images[currentIndex]})`,
                      }}
                      className={styles.pet_card_image}
                    ></div>
                  )}

                  <button
                    className={`${styles.carousel_button} ${styles.next}`}
                    onClick={() => nextImage(car._id)} // Navegar para a próxima imagem
                  >
                    &#10095;
                  </button>
                </div>
                <h3>{car.name}</h3>
                <p>
                  <span className="bold">Preço:</span> +R${car.price}
                </p>
                <p>
                  <span className="bold">Localidade:</span> {car.location}
                </p>
                {car.available ? (
                  <Link to={`cars/${car._id}`}>Mais detalhes</Link>
                ) : (
                  <p className={styles.adopted_text}>Vendido</p>
                )}
              </div>
            );
          })
        ) : (
          <p>Não há carros cadastrados ou disponíveis para compra no momento!</p>
        )}
      </div>
    </section>
  );
}

export default Home;
