import React from "react";
import UserIcon from "../../assets/icons/userCard.png";

const UsersCard = () => {
  return (
    <section className="students_list_cards-container">
      <div className="CardInstituicoes">
        <img
          src={UserIcon}
          className="Icon"
          alt="Icone representando um usuario"
        />
        <div className="CardInfo">
          <p>
            <b>Nome:</b> E.M Rui Barbosa
          </p>
          <p className="card_info-adress">
            <b>Email:</b> severo.snape@gmail.com
          </p>
          <p>
            <b>Função:</b> Coordenador
          </p>
          <p>
            <b>Instituição:</b> E.M Rui Barbosa
          </p>
        </div>
      </div>
    </section>
  );
};

export default UsersCard;
