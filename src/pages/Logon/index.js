import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import heroesImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'

export default function Logon (){
    const [id, setId] = useState('')

    const history = useHistory()

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const response = await api.get(`/ongs/${id}`)

            if(!response.data) throw Error()

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch (error) {
            alert('Erro no Login! Tente novamente!')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Be the hero"/>
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                            Não possuo cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes"/>
        </div>
    )
}