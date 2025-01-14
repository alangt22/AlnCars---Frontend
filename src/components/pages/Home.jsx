import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const [cars, setCars] = useState([]);
  const [inputs, setInputs] = useState({
    searchTerm: '',
    brandFilter: '',
    cityFilter: ''
  });
  const [filteredCars, setFilteredCars] = useState([]);

  const brands = [
    "Honda", "Fiat", "Ford", "Chevrolet", "Renault", "Toyota",
    "Volkswagen", "BMW", "Audi", "Nissan", "Hyundai", "Kia",
    "Mercedes-Benz", "Jeep", "Mitsubishi"
  ];

  const CarCarousel = ({ car }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % car.images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length);
    };

    return (
      <div className={styles.carousel_container}>
        <button
          className={`${styles.carousel_button} ${styles.prev}`}
          onClick={prevImage}
        >
          &#10094;
        </button>
        {car.images && car.images.length > 0 && (
        <img
          src={`${import.meta.env.VITE_API_URL}/images/cars/${car.images[currentIndex]}`}
          alt={car.name}
          className={styles.car_card_image}
          loading="lazy"
        />
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

  useEffect(() => {
    api.get('/cars').then((response) => {
      const carsWithIndex = response.data.cars.map((car) => ({
        ...car,
        currentIndex: 0, 
      }));
      setCars(carsWithIndex);
      setFilteredCars(carsWithIndex); 
    });
  }, []);

  const applyFilter = () => {
    const filtered = cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(inputs.searchTerm.toLowerCase());
      const matchesBrand = inputs.brandFilter ? car.brand.toLowerCase().includes(inputs.brandFilter.toLowerCase()) : true;
      const matchesCity = inputs.cityFilter ? car.location.toLowerCase().includes(inputs.cityFilter.toLowerCase()) : true;
      return matchesSearch && matchesBrand && matchesCity;
    });
    setFilteredCars(filtered);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  return (
    <section>
      <div className={styles.car_home_header}>
        <h1><span className='bold'>Carros à Venda:</span> Encontre o Seu Ideal Aqui</h1>
        <Link className={styles.back} to={'/'}>Voltar</Link>
        <p>Explore nossa variedade de carros de todas as marcas, com opções para todos os gostos e orçamentos. Encontre seu próximo carro hoje mesmo.</p>

        <div className={styles.filters}>
          <input 
            type="text"
            value={inputs.searchTerm}
            name="searchTerm"
            onChange={handleChange}
            placeholder="Nome do carro..."
            className={styles.filter_input}
          />
          <select
            value={inputs.brandFilter}
            name="brandFilter"
            onChange={handleChange}
            className={styles.filter_input}
          >
            <option value="">Selecione a Marca</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
          <input 
            type="text"
            value={inputs.cityFilter}
            name="cityFilter"
            onChange={handleChange}
            placeholder="Cidade..."
            className={styles.filter_input}
          />  
          <button onClick={applyFilter} className={styles.filter_button}>
            Filtrar
          </button>        
        </div>

        {filteredCars.length === 0 && <h1>Nenhum carro encontrado!</h1>}
      </div>

      <div className={styles.car_container}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className={styles.car_card}>
              <CarCarousel car={car} />
              <h4>{car.name}</h4>
              <p><span className="bold">Marca:</span> {car.brand}</p>
              <p><span className="bold">Preço:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price)}</p>
              <p><span className="bold">Localidade:</span> {car.location}</p>
              {car.available ? (
                <Link to={`/cars/${car._id}`}>Mais detalhes</Link>
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
