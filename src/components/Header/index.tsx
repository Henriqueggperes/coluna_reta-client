import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import logo from "../../assets/icons/cr_logo.png";
import user from "../../assets/icons/user.svg";
import exit from "../../assets/icons/exit.svg";
import loginService from "../../services/authService";
import { useEffect, useState } from "react";
import { userObj } from "../../types/types";
import { toast } from "react-toastify";

const Header = () => {
  
  const [userLogged, setUserLogged] = useState<userObj>({
    name: "",
    role: "",
    institution_id: [],
    email: "",
    recoverPasswordToken: "",
  });
  
  const getLoggedUser = async () => {
    const response = await loginService.loggedUser();
    setUserLogged(response.data)
  };
  
  
  const navigate = useNavigate();
  
  const logOutUser = () => {
    localStorage.clear();
    toast.success("Log-out realizado", {
      closeButton: false,
      className: "toast-class",
    });
    navigate("/");
  };
  
  useEffect(() => {
     getLoggedUser()

  }, []);
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
          <div className="ADMIN">
            <span>{userLogged.name}</span>
            {userLogged.role == "ADMIN" ? (
              <span className="optAdmin">Admin</span>
            ) : (
              ""
            )}
          </div>
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
