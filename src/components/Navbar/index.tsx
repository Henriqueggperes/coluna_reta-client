import React, { useState } from "react";
import "./style.css";

import user_profile from "../../assets/icons/user_icon.svg";
import dashboard_icon from "../../assets/icons/dashboard_icon.svg";
import students_icon from "../../assets/icons/students_icon.svg";
import list_icon from "../../assets/icons/list_icon.svg";
import gear_icon from "../../assets/icons/gear_icon.svg";

const Navbar = (props: { navOptionSelected: Function, userRole:string}) => {
  const [option, setOption] = useState("");

 

  props.navOptionSelected(option);

  const handleOption = (event: any) => {
    setOption(event.target.id);
  };

  return (
    <aside className="navbar-container">
      {/* <div className="nav-active">
    <img className="navbar_active-icon " src={list_icon} />
    </div>  TRECHO PARA ADAPTAÇÃO DA NAVBAR PARA RESPONSIVIDADE */} 
      
      <div
        className={`navbar_students nav_item ${
          option == "Alunos" ? option : ""
        }`}
        onClick={handleOption}
      >
        <img className="navbar-students nav-icon" src={students_icon} />
        <span id="Alunos" className="navbar-students nav-span">
          Alunos
        </span>
      </div>

      {/* <div
        className={`navbar_dashboard nav_item ${
          option == "Dashboard" ? option : ""
        }`}
        onClick={handleOption}
      >
        <img className="navbar-dashboard nav-icon" src={dashboard_icon} />
        <span id="Dashboard" className="navbar-dashboard nav-span">
          Dashboard
        </span>
      </div> */}
      {props.userRole == 'ADMIN' ? (
        <div
          className={`navbar_admin nav_item ${option == "Admin" ? option : ""}`}
        >
          <div className="navbar_admin-option">
            <img className="navbar_admin-icon nav-icon" src={gear_icon} />
            <span id="Admin" className="navbar_admin-span nav-span">
              Admin
            </span>
          </div>
          <div className="admin-dropdown">
            <span className="admin_dropdown-item" id="Ger.Usuários" onClick={handleOption}>Ger. Usuários</span>
            <span className="admin_dropdown-item" id="Ger.Instituições" onClick={handleOption}>Ger. Instituições</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </aside>
  );
};

export default Navbar;
