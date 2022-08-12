import React, { useState } from "react";
import "./style.css";
import user_profile from "./../../assets/icons/user_icon.svg";
import dashboard_icon from "./../../assets/icons/dashboard_icon.svg";
import students_icon from "./../../assets/icons/students_icon.svg";
import list_icon from "./../../assets/icons/list_icon.svg";

const Navbar = (props: { navOptionSelected: any }) => {
  const [option, setOption] = useState("");

  props.navOptionSelected(option);

  const handleOption = (event: any)=>{ 
    setOption(event.target.id)
  }

  return (
    <aside className="navbar-container">
      {/* <div className="nav-active">
    <img className="navbar_active-icon " src={list_icon} />
    </div> */}
      <div
        className={`navbar_dashboard nav_item ${
          option == "User" ? option : ""
        }`}
        onClick = {handleOption}
      >
        <img className="nav-icon" src={user_profile} />
        <span id="User" className="navbar-user_profile nav-span">
          User
        </span>
      </div>
      
      <div
        className={`navbar_students nav_item ${
          option == "Alunos" ? option : ""
        }`}
        onClick = {handleOption}
      >
        <img className="navbar-students nav-icon" src={students_icon} />
        <span id="Alunos" className="navbar-students nav-span">
          Alunos
        </span>
      </div>

      <div
        className={`navbar_dashboard nav_item ${
          option == "Dashboard" ? option : ""
        }`}
        onClick = {handleOption}
      >
        <img className="navbar-dashboard nav-icon" src={dashboard_icon} />
        <span id="Dashboard" className="navbar-dashboard nav-span">
          Dashboard
        </span>
      </div>
    </aside>
  );
};

export default Navbar;
