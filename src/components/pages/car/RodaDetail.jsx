import React, { useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../../utils/api'
import styles from './CarDetail.module.css'
import NewStyles from '../../form/Form.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'

const RodaDetail = () => {
  const [roda, setRoda] = useState({})
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % roda.images.length)
}

const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + roda.images.length) % roda.images.length)
}

useEffect(() => {
    api.get(`/rodas/${id}`).then((response) => {
        setRoda(response.data.roda)
    })
}, [id])

    async function schedule() {
        setIsLoading(true)
        let msgType = 'success'

        try {
            const response = await api.patch(`/rodas/schedule/${roda._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })

            
            setFlashMessage(response.data.message, msgType)
            setIsLoading(false)
        } catch (err) {
          
            msgType = 'error'
            setFlashMessage(err.response?.data?.message || 'Erro ao agendar visita.', msgType)
            setIsLoading(false)
        }
    }

  return (
    <>
      {roda.name && (
          <section className={styles.car_details_container}>
            <div className={styles.cardetails_header}>
                <h1>Detalhes da roda: {roda.name}</h1>
                <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                <Link className={styles.back} to={'/rodas'}>Voltar</Link>
            </div>

            <button
                className={`${styles.carousel_button} ${styles.prev}`}
                onClick={prevImage}
            >
                &#10094;
            </button>
            <div className={styles.car_images}>
                {roda.images && roda.images.length > 0 && (
                    <img
                        src={`${import.meta.env.VITE_API_URL}/images/rodas/${roda.images[currentIndex]}`}
                        alt={roda.name}
                    />
                )}
            </div>

            <button
                className={`${styles.carousel_button} ${styles.next}`}
                onClick={nextImage} 
            >
                &#10095;
            </button>

            {token ? (
                <div className={NewStyles.form_container_2}>
                    <button
                        type='submit'
                        onClick={schedule}
                        disabled={isLoading}  
                        className={styles.submitButton_1}
                    >
                        {isLoading ? (
                            <span className={NewStyles.loader_2}></span> 
                        ) : (
                            "Solicitar uma visita" 
                        )}
                    </button>
                </div>
            ) : (
                <p>Você precisa <Link to='/register'>criar uma conta</Link> para solicitar a visita</p>
            )}
          </section>
      )}
    </>
  )
}

export default RodaDetail