import React from 'react'
import  LoginImg from "../../assets/img/login_char.svg";
import Logo from "../../assets/icons/cr_logo.png";
import "./style.css";

export const LoginPage = () => {
    return (
        <section className='MainSection'>
            <section className="card-login">
                <form>
                    <label htmlFor="email">E-mal</label>
                    <input type="email" name="email" id="email" />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />

                    <button type="submit">Entrar</button>
                </form>
            </section>
            
            <section className="img-login">
                <img src={Logo} className='CR' alt="Ilustração do logo Coluna Reta" />
                <span>Backoffice</span>
                <img src={LoginImg} className='LoginImg' alt="Ilustração de um usuario fazendo login na aplicação" />
            </section>
        </section>
    );
  };
