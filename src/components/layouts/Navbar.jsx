import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/img/bmw.png';  
import { Context } from '../../context/UserContext';
import api from '../../utils/api';

const Navbar = () => {
  const { authenticated, logout, user } = useContext(Context); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const [userImage, setUserImage] = useState(''); 
  const menuRef = useRef(null);  

  
  useEffect(() => {
    if (authenticated) {
      const fetchUserImage = async () => {
        try {
          const response = await api.get(`/users/checkuser`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          });
          setUserImage(response.data.image); 
        } catch (error) {
          console.error('Erro ao buscar imagem de perfil', error);
        }
      };
      fetchUserImage();
    }
  }, [authenticated]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);  
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();  
    setMenuOpen(false);  
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={logo} alt="Aln cars" />  
        <h2>ALN Cars</h2>
      </div>

      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      <ul ref={menuRef} className={`${styles.navbarMenu} ${menuOpen ? styles.show : ''}`}>
        <li>
          <Link to="/" onClick={handleMenuItemClick}>Comprar</Link>
        </li>

        {authenticated ? (
          <>
            <li>
              <Link to="/cars/mybuyers" onClick={handleMenuItemClick}>Minhas Compras</Link>
            </li>
            <li>
              <Link to="/cars/mycars" onClick={handleMenuItemClick}>Meus Anuncios</Link>
            </li>
            <li>
              <Link to="/user/profile" onClick={handleMenuItemClick}>Perfil</Link>
            </li>
            <li onClick={handleLogout}>Sair</li>
        

            
            <div className={styles.userProfileImage}>
              {userImage ? (
                <img 
                  src={`${import.meta.env.VITE_API_URL}/images/users/${userImage}`} 
                  alt="Imagem do usuário" 
                  className={styles.profileImage}
                />
              ) : (
                <div className={styles.profileImagePlaceholder}>Perfil</div> 
              )}
            </div>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={handleMenuItemClick}>Entrar</Link>
            </li>
            <li>
              <Link to="/register" onClick={handleMenuItemClick}>Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
