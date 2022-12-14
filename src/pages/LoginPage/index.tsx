import React, { useEffect, useState } from "react";
import LoginImg from "../../assets/img/login_char.svg";
import Logo from "../../assets/icons/cr_logo.png";
import { LoginInterface } from "../../types/types";
import loginService from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
 
  useEffect(()=>{
    if(jwt){
      navigate('/backoffice')
    }
  },[])


  const navigate = useNavigate()

  const jwt = localStorage.getItem('jwt')

  
 
  const [values, setValues] = useState({
    email: "",
    passwordHash: "",
  });
 

  const handleChangesValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values: LoginInterface) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

 const handleAuthLogin = async (event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault()
  const response = await loginService.login(values);
  const jwt = response.data.token;
  
  if (!jwt) {
    toast.error(response.data.message,{
      position: toast.POSITION.TOP_RIGHT,
      className:"toast-class",
      closeButton: false,
    })
  } else {
    localStorage.setItem('jwt', jwt);
    navigate('/backoffice');
  }
 }

  return (
    <section className="background">
      <section className="MainSection">
        <section className="left-side">
          <div className="logo">
            <img
              src={Logo}
              className="CR"
              alt="Ilustração do logo Coluna Reta"
            />
            <span className="login-heading__span"> Backoffice</span>
          </div>

          <div className="card-login">
            <form onSubmit={handleAuthLogin} className="login__form" >
              <h1>Bem Vindo!</h1>
              <div className="single-input">
                <input
                  required
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChangesValues}
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="single-input">
                <input
                  required
                  className="input"
                  type="password"
                  name="passwordHash"
                  id="password"
                  onChange={handleChangesValues}
                />
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit">Entrar</button>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            </form>
          </div>
        </section>

        <div className="between" />

        <section className="right-side">
          <img
            src={LoginImg}
            className="LoginImg"
            alt="Ilustração de um usuario fazendo login na aplicação"
          />
        </section>
      </section>
    </section>
  );
};
