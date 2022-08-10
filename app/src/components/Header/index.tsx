import React from "react";
import "./style.css";
import logo from './../../assets/icons/cr_logo.png'
import user from './../../assets/icons/user.svg'
import exit from './../../assets/icons/exit.svg'

const Header = () => {
  return (
      <header className="backoficce-header">
        <div className="header_logo-container">
         <img src={logo} alt="Logo roxo do Coluna Reta Backoficce" className="header-logo" />
         <span className="header_logo-span">Backoficce</span>
        </div>
        <div className="header_user_card-container">
            <img src={user} alt="Imagem do usuário" className="header_user_card-image"  />
            <img src={exit} alt="Icone para sair da plataforma" className="header_user_card_exit-icon" />
        </div>
      </header>
  );
};

export default Header;
