import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useParams, Link } from 'react-router-dom'
import styles from './CarDetail.module.css'
import NewStyles from '../../form/Form.module.css'

//hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

const CarDetail = () => {
    const [car, setCar] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')
    const [isLoading, setIsLoading] = useState(false)


    const [currentIndex, setCurrentIndex] = useState(0)

    
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % car.images.length)
    }

    
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length)
    }

    useEffect(() => {
        api.get(`/cars/${id}`).then((response) => {
            setCar(response.data.car)
        })
    }, [id])

    
    async function schedule() {
        setIsLoading(true)
        let msgType = 'success'

        try {
            const response = await api.patch(`/cars/schedule/${car._id}`, {}, {
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
            {car.name && (
                <section className={styles.car_details_container}>
                    <div className={styles.cardetails_header}>
                        <h1>Conhecendo o Carro: {car.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                        <Link className={styles.back} to={'/home'}>Voltar</Link>
                    </div>

                    <button
                        className={`${styles.carousel_button} ${styles.prev}`}
                        onClick={prevImage}
                    >
                        &#10094;
                    </button>

                   
                    <div className={styles.car_images}>
                        {car.images && car.images.length > 0 && (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/images/cars/${car.images[currentIndex]}`}
                                alt={car.name}
                            />
                        )}
                    </div>

                    <button
                        className={`${styles.carousel_button} ${styles.next}`}
                        onClick={nextImage} 
                    >
                        &#10095;
                    </button>

                    <p>
                        <span className='bold'>Marca:</span> {car.brand}
                    </p>
                    <p>
                        <span className="bold">Km:</span> {new Intl.NumberFormat('pt-BR').format(car.km)} km
                    </p>
                    <p>
                        <span className="bold">Preço:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price)}
                    </p>
                    <p>
                        <span className='bold'>Câmbio:</span> {car.transmission}
                    </p>
                    <p>
                        <span className='bold'>Cor:</span> {car.color}
                    </p>
                    <p>
                        <span className='bold'>Ano:</span> {car.year}
                    </p>
                    <p>
                        <span className='bold'>Combustível:</span> {car.fuel}
                    </p>
                    <p>
                        <span className='bold'>Motor:</span> {car.motor}
                    </p>
                    <p>
                        <span className='bold'>Localidade:</span> {car.location}
                    </p>

                    <div>
                        <h3>Características:</h3>
                        {car.features && Array.isArray(car.features) && car.features.length > 0 ? (
                            car.features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    {feature} 
                                </div>
                            ))
                        ) : (
                            <p>Este carro não possui características adicionais.</p>
                        )}
                    </div>
                    <h3>Mais Informações:</h3>
                    <div className={styles.featureItem}>
                       
                        <p className={styles.caracteristicas}>{car.moreInfo}</p>
                    </div>

                   
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

export default CarDetail
