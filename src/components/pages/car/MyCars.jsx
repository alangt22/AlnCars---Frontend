import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'
import RoundedImage from '../../layouts/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyCars() {
  const [cars, setCars] = useState([])
  const [rodas, setRodas] = useState([])
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

  useEffect(() => {
    api
      .get('/rodas/myrodas', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setRodas(response.data.rodas)
      })
      .catch((err) => {
        setFlashMessage('Erro ao carregar suas Rodas!', err)
      })
  }, [token])

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

  async function removeRodas(id) {
    let msgType = 'success'

    try {
      const response = await api.delete(`/rodas/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      const updatedRodas = rodas.filter((roda) => roda._id !== id)
      setRodas(updatedRodas)
      setFlashMessage(response.data.message, msgType)
    } catch (err) {
      msgType = 'error'
      setFlashMessage(err.response?.data?.message || 'Erro ao excluir a Roda.', msgType)
    }
  }

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

  async function concludeBuyer2(id) {
    let msgType = 'success'

    try {
      const response = await api.patch(`/rodas/conclude/${id}`, {}, {
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
        <h1>Meus Anuncios Cadastrados</h1>
        <Link to="/cars/add">Cadastrar Carro</Link>
        <Link to="/rodas/add">Cadastrar Roda</Link>
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
                  <p className={styles.check}>Compra concluida!</p>
                )}
              </div>
            </div>
          ))
        ) : null}
      </div>

      <div className={styles.carslist_container}>
        {rodas.length > 0 ? (
          rodas.map((roda) => (
            <div key={roda._id} className={styles.carlist_row}>
              <RoundedImage
                src={`${import.meta.env.VITE_API_URL}/images/rodas/${roda.images[0]}`}
                alt={roda.name}
                width="px75"
              />
              <span className="bold">{roda.name}</span>
              <div className={styles.actions}>
                {roda.available ? (
                  <>
                    {roda.buyer && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeBuyer2(roda._id)
                        }}
                      >
                        Concluir Negociação
                      </button>
                    )}
                    <Link to={`/rodas/edit/${roda._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removeRodas(roda._id)
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p className={styles.check}>Compra concluida!</p>
                )}
              </div>
            </div>
          ))
        ) : null}
      </div>

      {/* Exibindo a mensagem única se ambos estiverem vazios */}
      {(cars.length === 0 && rodas.length === 0) && (
        <p className={styles.no_items}>Não há itens cadastrados!</p>
      )}
    </section>
  )
}

export default MyCars
