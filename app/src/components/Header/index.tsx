import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import logo from "./../../assets/icons/cr_logo.png";
import user from "./../../assets/icons/user.svg";
import exit from "./../../assets/icons/exit.svg";
import loginService from "../../services/auth";
import { useEffect, useState } from "react";
import { userObj } from "../../types/types";
import { toast } from "react-toastify";

const Header = (props:{loggedUser:userObj,}) => {
  
  const navigate = useNavigate();
  
  const logOutUser = () =>{
    localStorage.clear()
    toast.success('Log-out realizado',{
    closeButton: false,
    className:'toast-class'
    })
    navigate('/')
  }

 
  return (
    <>
    <header className="backoficce-header">
      <Link className="backoficce-link" to={"/backoffice"}>
        <div className="header_logo-container">
          <img
            src={logo}
            alt="Logo roxo do Coluna Reta Backoficce"
            className="header-logo"
            />
          <span className="header_logo-span">Backoffice</span>
        </div>
      </Link>
      <div className="header_user_card-container">
        <span>{props.loggedUser.name}</span>
        <img
          src={exit}
          alt="Icone para sair da plataforma"
          className="header_user_card_exit-icon"
          onClick={logOutUser}
        />
      </div>    
    </header>
   </>
  );
};

export default Header;
