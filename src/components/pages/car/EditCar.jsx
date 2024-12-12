import React from 'react'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './AddCar.module.css'
import CarForm from '../../form/CarForm'
//hooks
import useFlashMessage from '../../../hooks/useFlashMessage'


const EditCar = () => {
    const [car, setCar] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get(`/cars/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setCar(response.data.car)
        })
    }, [token, id])

    async function updateCar(car) {
        
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(car).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < car[key].length; i++) {
                    formData.append('images', car[key][i])
                }
            } else {
                formData.append(key, car[key])
            }
        })

        formData.append('car', formData)

        const data = await api.patch(`cars/${car._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

  return (
    <section>
        <div className={styles.addcar_header}>
            <h1>Editando o Carro: {car.name}</h1>
            <p>Depois da edição os Carros serão atualizados no sistema</p>
        </div>
        {car.name && (
            <CarForm handleSubmit={updateCar} btnText="Atualizar" carData={car}/>
        )}
    </section>
  )
}

export default EditCar