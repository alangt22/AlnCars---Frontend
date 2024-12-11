import { useState, useContext } from 'react'
import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* contexts */
import { Context } from '../../../context/UserContext'

function Login() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)
  
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit (e) {
     e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      await login(user)// Make sure register is an async function
    } catch (error) {
      console.error("Error during registration", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleChange}
        />
        <button
          type="submit"
          disabled={isLoading}  // Desabilitar o botão enquanto estiver carregando
          className={styles.submitButton}
        >
          {isLoading ? (
            <span className={styles.loader}></span> // Exibe o loader quando estiver carregando
          ) : (
            "Entrar" // Texto do botão quando não estiver carregando
          )}
        </button>
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  )
}

export default Login