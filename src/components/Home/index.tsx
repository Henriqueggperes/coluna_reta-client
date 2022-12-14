import React from "react";
import "./style.css";
import thesis_char from "../../assets/img/home_thesis_char.svg";
import teacher_char from "../../assets/img/home_teacher_char.svg";
import { userObj } from "../../types/types";

const Home = (props: { loggedUser: userObj }) => {
  return (
    <main className="home-content-container">
      <section className="welcome-text__container">
        <h1 className="home_welcome-heading">Olá, {props.loggedUser.name}.</h1>
        <p className="home_welcome_parag-1 parag">
          Bem vindo ao <span className="parag-styled"> CR Backoffice!</span>
        </p>
        <p className="home_welcome_parag-2 parag">
          Onde escolas e seus alunos se conectam com uma vida saudável.
        </p>
      </section>

      <section className="home_welcome_images-container">
        <div className="home_welcome_thesis_char char-container">
          <img
            className="thesis_char home_img-char"
            src={thesis_char}
            alt="Desenho ilustrativo de uma mulher estudando sobre livros"
          />
        </div>
        <div className="home_welcome_teacher_char char-container">
          <img
            className="teacher_char home_img-char"
            src={teacher_char}
            alt="Desenho ilustrativo de um professor ensinando crianças em uma sala de aula"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
