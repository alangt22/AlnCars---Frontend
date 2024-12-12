import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'
import RoundedImage from '../../layouts/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyCars() {
  const [cars, setCars] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()


  if (!token) {
    setFlashMessage('Você precisa estar logado para acessar essa página!', 'error')
    return <p>Você precisa estar logado para acessar essa página.</p>
  }

  useEffect(() => {
    api
      .get('/cars/mycars', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setCars(response.data.cars)
      })
      .catch((err) => {
        setFlashMessage('Erro ao carregar seus Carros!', err)
      })
  }, [token])

  // Função para remover o pet
  async function removeCar(id) {
    let msgType = 'success'

    try {
      const response = await api.delete(`/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      const updatedCars = cars.filter((car) => car._id !== id)
      setCars(updatedCars)
      setFlashMessage(response.data.message, msgType)
    } catch (err) {
      msgType = 'error'
      setFlashMessage(err.response?.data?.message || 'Erro ao excluir o Carro.', msgType)
    }
  }

  // Função para concluir a adoção do pet
  async function concludeBuyer(id) {
    let msgType = 'success'

    try {
      const response = await api.patch(`/cars/conclude/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      setFlashMessage(response.data.message, msgType)
    } catch (err) {
      msgType = 'error'
      setFlashMessage(err.response?.data?.message || 'Erro ao concluir a Compra.', msgType)
    }
  }

  return (
    <section>
      <div className={styles.carslist_header}>
        <h1>Meus Carros Cadastrados</h1>
        <Link to="/cars/add">Cadastrar Carro</Link>
      </div>
      <div className={styles.carslist_container}>
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className={styles.carlist_row}>
              <RoundedImage
                src={`${import.meta.env.VITE_API_URL}/images/cars/${car.images[0]}`}
                alt={car.name}
                width="px75"
              />
              <span className="bold">{car.name}</span>
              <div className={styles.actions}>
                {car.available ? (
                  <>
                    {car.buyer && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeBuyer(car._id)
                        }}
                      >
                        Concluir Negociação
                      </button>
                    )}
                    <Link to={`/cars/edit/${car._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removeCar(car._id)
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Carro já Comprado</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há Carros cadastrados!</p>
        )}
      </div>
    </section>
  )
}

export default MyCars
