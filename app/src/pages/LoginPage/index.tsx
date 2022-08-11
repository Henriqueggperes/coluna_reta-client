import React from "react";
import LoginImg from "../../assets/img/login_char.svg";
import Logo from "../../assets/icons/cr_logo.png";
import "./style.css";

export const LoginPage = () => {
  return (
    <section className="background">
      <section className="MainSection">
        <section className="left-side">
          <div className="card-login">
            <form>
              <h1>Bem vindo!</h1>
              
              <div className="single-input">
                <input required className="input" type="email" name="email" id="email" />
                <label htmlFor="email">E-mail</label>
              </div>
              
              <div className="single-input">
                <input required className="input" type="password" name="password" id="password" />
                <label htmlFor="password">Password</label>
              </div>

              <button type="submit">Entrar</button>
            </form>
          </div>
        </section>

        <section className="right-side">
          <div className="logo">
            <img
              src={Logo}
              className="CR"
              alt="Ilustração do logo Coluna Reta"
            />
            <span> Backoffice</span>
          </div>
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
