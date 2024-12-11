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

    // Inicializa o índice de imagem
    const [currentIndex, setCurrentIndex] = useState(0)

    // Função para ir para a próxima imagem de um carro específico
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % car.images.length)
    }

    // Função para ir para a imagem anterior de um carro específico
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length)
    }

    useEffect(() => {
        api.get(`/cars/${id}`).then((response) => {
            setCar(response.data.car)
        })
    }, [id])

    // Função para agendar a visita
    async function schedule() {
        setIsLoading(true)
        let msgType = 'success'

        try {
            const response = await api.patch(`/cars/schedule/${car._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })

            // Se a requisição for bem-sucedida, mostramos a mensagem de sucesso
            setFlashMessage(response.data.message, msgType)
        } catch (err) {
            // Caso haja erro, mostramos a mensagem de erro
            msgType = 'error'
            setFlashMessage(err.response?.data?.message || 'Erro ao agendar visita.', msgType)
            setIsLoading(false)
        }
    }

 

    return (
        <>
            {car.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.petdetails_header}>
                        <h1>Conhecendo o Carro: {car.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                    </div>

                    <button
                        className={`${styles.carousel_button} ${styles.prev}`}
                        onClick={prevImage} // Navegar para a imagem anterior
                    >
                        &#10094;
                    </button>

                    {/* Exibindo as imagens do carro */}
                    <div className={styles.pet_images}>
                        {car.images && car.images.length > 0 && (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/public/images/cars/${car.images[currentIndex]}`}
                                alt={car.name}
                            />
                        )}
                    </div>

                    <button
                        className={`${styles.carousel_button} ${styles.next}`}
                        onClick={nextImage} // Navegar para a próxima imagem
                    >
                        &#10095;
                    </button>

                    <p>
                        <span className='bold'>Km:</span> {car.km} Km
                    </p>
                    <p>
                        <span className='bold'>Preço:</span> R${car.price}
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
                                    {feature} {/* Exibe cada característica */}
                                </div>
                            ))
                        ) : (
                            <p>Este carro não possui características adicionais.</p>
                        )}
                    </div>

                    {/* Verifica se o usuário está logado */}
                    {token ? (
                        <div className={NewStyles.form_container_2}>
                            <button
                                type='submit'
                                onClick={schedule}
                                disabled={isLoading}  // Desabilitar o botão enquanto estiver carregando
                                className={styles.submitButton_1}
                            >
                                {isLoading ? (
                                    <span className={NewStyles.loader_2}></span> // Exibe o loader quando estiver carregando
                                ) : (
                                    "Solicitar uma visita" // Texto do botão quando não estiver carregando
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
