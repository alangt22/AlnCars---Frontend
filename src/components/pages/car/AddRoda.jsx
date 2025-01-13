import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AddCar.module.css'
import RodaForm from '../../form/RodaForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddRoda() {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false)

  async function registerCar(roda) {
    let msgType = 'success'

    const formData = new FormData()

    const rodaFormData = await Object.keys(roda).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < roda[key].length; i++) {
          formData.append('images', roda[key][i])
        }
      } else {
        formData.append(key, roda[key])
      }
    })

    formData.append('roda', rodaFormData)

    setIsLoading(true)  // Inicia o loading

    const data = await api
      .post('rodas/create', formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setIsLoading(false)  // Finaliza o loading

    setFlashMessage(data.message, msgType)
    if (msgType !== 'error') {
      navigate('/cars/mycars')
    }
  }

  return (
    <section>
      <div className={styles.addcar_header}>
        <h1>Cadastre um Carro</h1>
        <p>Depois ele ficará disponível para Compra</p>
      </div>
      <RodaForm handleSubmit={registerCar} btnText="Cadastrar" isLoading={isLoading} />
    </section>
  )
}

export default AddRoda
