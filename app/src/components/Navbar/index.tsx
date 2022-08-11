import { useState } from "react";
import "./style.css"
import user_profile from "./../../assets/icons/user_icon.svg";
import dashboard_icon from "./../../assets/icons/dashboard_icon.svg"
import students_icon from "./../../assets/icons/students_icon.svg"
import list_icon from "./../../assets/icons/list_icon.svg"


const Navbar = () => {
  return (

    <aside className="navbar-container">
    {/* <div className="nav-active">
    <img className="navbar_active-icon " src={list_icon} />
    </div> */}
      <div className="navbar_user_profile nav-item">
        <img className="navbar-user_profile nav-icon" src={user_profile} />
        <span className="navbar-user_profile nav-span">User profile</span>
      </div>
      <div className="navbar_students nav-item">
        <img className="navbar-students nav-icon" src={students_icon} />
        <span className="navbar-students nav-span">Alunos</span>
      </div>
      <div className="navbar_dashboard nav-item">
        <img className="navbar-dashboard nav-icon" src={dashboard_icon} />
        <span className="navbar-dashboard nav-span">Dashboard</span>
      </div>
    </aside>
 
  );
};

export default Navbar;
