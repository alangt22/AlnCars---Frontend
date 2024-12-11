import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../form/Input';
import styles from '../../form/Form.module.css';
import { Context } from '../../../context/UserContext';
import PhoneInput from 'react-phone-number-input/input'; // Import the PhoneInput component
import 'react-phone-number-input/style.css'; // Import styles for the phone input field

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      await register(user); // Make sure register is an async function
    } catch (error) {
      console.error("Error during registration", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
        />
        {/* Phone Input with react-phone-number-input */}
        <label htmlFor="phone">Telefone:</label>
        <div className="phone">
          <PhoneInput
            id="phone"
            name="phone"
            placeholder="Digite seu numero com DDD"
            value={user.phone}
            onChange={(value) => setUser({ ...user, phone: value })}
            defaultCountry="BR"
            className={styles.input}
          />
        </div>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
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
            "Cadastrar" // Texto do botão quando não estiver carregando
          )}
        </button>
      </form>
      <p>
        Já tem conta? <Link to='/login'>Clique aqui</Link>
      </p>
    </section>
  );
}

export default Register;
