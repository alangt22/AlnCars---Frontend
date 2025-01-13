import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import api from '../../../utils/api';
import RoundedImage from '../../layouts/RoundedImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; 

const MyBuyers = () => {
  const [cars, setCars] = useState([]);
  const [rodas, setRodas] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get('/cars/mybuyers', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setCars(response.data.cars);
    });
  }, [token]);

  useEffect(() => {
    api.get('/rodas/mybuyers', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setRodas(response.data.rodas);
    });
  }, [token]);

  return (
    <section>
      <div className={styles.carlist_header}>
        <h1 className={styles.title}>Minhas Compras</h1>
      </div>
      <div className={styles.carlist_container}>
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className={styles.carlist_row1}>
              <RoundedImage
                src={`${import.meta.env.VITE_API_URL}/images/cars/${car.images[0]}`}
                alt={car.name}
                width="75px"
              />
              <span className="bold">{car.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> <span> {car.user.phone}</span>
                </p>
                <p className={styles.app}>Clique no link abaixo para falar no Wathsapp</p>
                <FontAwesomeIcon icon={faWhatsapp} className={styles.icon}/>
                <a 
                  href={`https://api.whatsapp.com/send/?phone=${car.user.phone}&text=Olá%20${car.user.name},%20estou%20interessado%20em%20Comprar%20seu%20Carro.%20&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappLink}  // Classe CSS para o link
                >
                  {car.user.phone}
                </a>
                <p>
                  <span className="bold">Fale com:</span> {car.user.name}
                </p>
              </div>

              <div className={styles.actions}>
                {car.available ? (
                  <p>Negociação em processo!</p>
                ) : (
                  <p className={styles.parabens}>Parabéns por concluir a Compra</p>
                )}
              </div>
            </div>
          ))
        ) : null}


      {rodas.length > 0 ? (
          rodas.map((roda) => (
            <div key={roda._id} className={styles.carlist_row}>
              <RoundedImage
                src={`${import.meta.env.VITE_API_URL}/images/rodas/${roda.images[0]}`}
                alt={roda.name}
                width="75px"
              />
              <span className="bold">{roda.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> <span> {roda.user.phone}</span>
                </p>
                <p className={styles.app}>Clique no link abaixo para falar no Wathsapp</p>
                <FontAwesomeIcon icon={faWhatsapp} className={styles.icon}/>
                <a 
                  href={`https://api.whatsapp.com/send/?phone=${roda.user.phone}&text=Olá%20${roda.user.name},%20estou%20interessado%20em%20Comprar%20sua%20Roda.%20&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappLink}  // Classe CSS para o link
                >
                  {roda.user.phone}
                </a>
                <p>
                  <span className="bold">Fale com:</span> <span>{roda.user.name}</span>
                </p>
              </div>

              <div className={styles.actions}>
                {roda.available ? (
                  <p>Negociação em processo!</p>
                ) : (
                  <p className={styles.parabens}>Parabéns por concluir a Compra</p>
                )}
              </div>
            </div>
          ))
        ) : null}
      </div>

      {(cars.length === 0 && rodas.length === 0) && (
        <p className={styles.no_items}>Não há itens!</p>
      )}
    </section>
  );
}

export default MyBuyers;
