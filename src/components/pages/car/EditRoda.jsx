import React from 'react'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './AddCar.module.css'
import RodaForm from '../../form/RodaForm'
import { Navigate } from 'react-router-dom'
//hooks
import useFlashMessage from '../../../hooks/useFlashMessage'


const EditRoda = () => {
    const [roda, setRoda] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()
    
    useEffect(() => {
        api.get(`/rodas/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            setRoda(response.data.roda);
        }).catch((err) => {
            console.error("Erro ao carregar a roda", err);
        });
    }, [token, id]);
    

    async function updateCar(roda) {
        
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(roda).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < roda[key].length; i++) {
                    formData.append('images', roda[key][i])
                }
            } else {
                formData.append(key, roda[key])
            }
        })

        formData.append('roda', formData)

        const data = await api.patch(`rodas/${roda._id}`, formData, {
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
        navigate('/cars/mycars')
    }

  return (
    <section>
        <div className={styles.addcar_header}>
            <h1>Editando a Roda: {roda.name}</h1>
            <p className={styles.txt}>Depois da edição as Rodas serão atualizados no sistema</p>
        </div>
        {roda.name && (
            <RodaForm handleSubmit={updateCar} btnText="Atualizar" carData={roda}/>
        )}
    </section>
  )
}

export default EditRoda