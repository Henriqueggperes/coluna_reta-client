import React, { useState } from "react";
import LoginImg from "../../assets/img/login_char.svg";
import Logo from "../../assets/icons/cr_logo.png";
import { LoginInterface } from "../../types/types";
import "./style.css";

export const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChangesValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values: LoginInterface) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  console.log(values);
    
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
            <form className="login__form" >
              <h1>BEM VINDO!</h1>
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
                  name="password"
                  id="password"
                  onChange={handleChangesValues}
                />
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit">ENTRAR</button>
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
