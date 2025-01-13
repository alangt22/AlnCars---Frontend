import React from 'react'
import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import NewStyles from '../../form/Form.module.css'
import Input from  '../../form/Input'
import { useState, useEffect } from 'react'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layouts/RoundedImage'

const Profile = () => {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0] })
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true);
        let msgType = 'success'
        
        const formData = new FormData()

        Object.keys(user).forEach((key) =>
            formData.append(key, user[key])
        )


        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            return response.data
        }).catch((error) => {
            msgType = 'error'
            return error.response.data
            
        })
        setIsLoading(false);
        setFlashMessage(data.message, msgType)
    }



  return (
    <section>
        <div className={styles.profile_header}>
            <h1 className={styles.profile}>Perfil</h1>
            {(user.image || preview) && (
                <RoundedImage src={preview ? URL.createObjectURL(preview) : `${import.meta.env.VITE_API_URL}/images/users/${user.image}`}
                    alt={user.name}
                />
            )}
        </div>
        <h2 className={styles.perfil}>{user.name}</h2>
        <form onSubmit={handleSubmit} className={formStyles.form_container}>
            <Input
                text='Imagem'
                type='file'
                name='image'
                handleOnChange={onFileChange}
            />
            <Input
                text='E-mail'
                type='email'
                name='email'
                placeholder='Digite seu e-mail'
                handleOnChange={handleChange}
                value={user.email || ""}
            />
            <Input
                text='Nome'
                type='text'
                name='name'
                placeholder='Digite seu nome'
                handleOnChange={handleChange}
                value={user.name || ""}
            />
            <Input
                text='Telefone'
                type='text'
                name='phone'
                placeholder='Digite seu telefone'
                handleOnChange={handleChange}
                value={user.phone || ""}
            />
            <Input
                text='Senha'
                type='password'
                name='password'
                placeholder='Digite sua senha'
                handleOnChange={handleChange}
            />
            <Input
                text='Confirmação de senha'
                type='password'
                name='confirmPassword'
                placeholder='Confirme sua senha'
                handleOnChange={handleChange}
            />
            <button
                type="submit"
                disabled={isLoading}  // Desabilitar o botão enquanto estiver carregando
                className={NewStyles.submitButton}
                >
                {isLoading ? (
                    <span className={NewStyles.loader}></span> // Exibe o loader quando estiver carregando
          ) : (
            "Editar" // Texto do botão quando não estiver carregando
          )}
        </button>
        </form>
    </section>
  )
}

export default Profile