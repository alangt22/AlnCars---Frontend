import React from 'react'
import styles from './Footer.module.css'
import logo from '../../assets/img/bmw.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <img src={logo} alt={logo} />
        <p><a href='/' className='bold'>Aln cars</a> &copy; 2024</p>
    </footer>
  )
}

export default Footer