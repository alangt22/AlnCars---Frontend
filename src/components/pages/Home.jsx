import React, { useState, useEffect, useMemo } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';


function Home() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

const FilterInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={styles.filter_input}
  />
);


const CarCarousel = ({ car, onNext, onPrev }) => {
  const currentIndex = car.currentIndex || 0;

  return (
    <div className={styles.carousel_container}>
      <button
        className={`${styles.carousel_button} ${styles.prev}`}
        onClick={() => onPrev(car._id)}
      >
        &#10094;
      </button>
      {car.images && car.images.length > 0 && (
        <div
          style={{
            backgroundImage: `url(${import.meta.env.VITE_API_URL}/images/cars/${car.images[currentIndex]})`,
          }}
          className={styles.car_card_image}
        ></div>
      )}
      <button
        className={`${styles.carousel_button} ${styles.next}`}
        onClick={() => onNext(car._id)}
      >
        &#10095;
      </button>
    </div>
  );
};

useEffect(() => {
  // Carregar carros da API
  api.get('/cars').then((response) => {
    const carsWithIndex = response.data.cars.map((car) => ({
      ...car,
      currentIndex: 0, // Inicializa o índice como 0
    }));
    setCars(carsWithIndex);
  });
}, []);

 
const filteredCarList = useMemo(() => {
  return cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter ? car.brand.toLowerCase().includes(brandFilter.toLowerCase()) : true;
    const matchesCity = cityFilter ? car.location.toLowerCase().includes(cityFilter.toLowerCase()) : true;
    return matchesSearch && matchesBrand && matchesCity;
  });
}, [searchTerm, brandFilter, cityFilter, cars]);

useEffect(() => {
  setFilteredCars(filteredCarList);
}, [filteredCarList]);

 
const nextImage = (carId) => {
  setCars((prevState) =>
    prevState.map((car) => {
      if (car._id === carId) {
        const nextIndex = (car.currentIndex + 1) % car.images.length;
        return { ...car, currentIndex: nextIndex };
      }
      return car;
    })
  );
};

const prevImage = (carId) => {
  setCars((prevState) =>
    prevState.map((car) => {
      if (car._id === carId) {
        const prevIndex = (car.currentIndex - 1 + car.images.length) % car.images.length;
        return { ...car, currentIndex: prevIndex };
      }
      return car;
    })
  );
};

  return (
    <section>
      <div className={styles.car_home_header}>
        <h1><span className='bold'>Carros à Venda:</span> Encontre o Seu Ideal Aqui</h1>
        <p>Explore nossa variedade de carros de todas as marcas, com opções para todos os gostos e orçamentos. Encontre seu próximo carro hoje mesmo.</p>

        
        <div className={styles.filters}>
          <FilterInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="nome..." 
          />
          <FilterInput 
            value={brandFilter} 
            onChange={setBrandFilter} 
            placeholder="marca..." 
          />
          <FilterInput 
            value={cityFilter} 
            onChange={setCityFilter} 
            placeholder="cidade..." 
          />
        </div>

      
        {filteredCars.length === 0 && <h1>Nenhum carro encontrado!</h1>}
      </div>

      <div className={styles.car_container}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className={styles.car_card}>
              <CarCarousel car={car} onNext={nextImage} onPrev={prevImage} />
              <h3>{car.name}</h3>
              <p><span className="bold">Marca:</span> {car.brand}</p>
              <p><span className="bold">Preço:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price)}</p>
              <p><span className="bold">Localidade:</span> {car.location}</p>
              {car.available ? (
                <Link to={`cars/${car._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Vendido</p>
              )}
            </div>
          ))
        ) : (
          <p>Não há carros cadastrados ou disponíveis para compra no momento!</p>
        )}
      </div>
    </section>
  );
}

export default Home;
