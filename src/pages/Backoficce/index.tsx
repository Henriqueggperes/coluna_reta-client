import "./style.css";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Home from "../../components/Home";
import React, { useEffect } from "react";
import Lists from "../../components/Lists";
import { useState } from "react";
import { render } from "react-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loginService from "../../services/authService";
import { userObj } from "../../types/types";

const Backoficce = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      toast.error("Realize o login antes de acessar o backoffice",{ 
      });
      console.log()
      navigate("/");
    }
  },[]);

  const [userLogged, setUserLogged] = useState<userObj>({
    created_at: "",
    deleted: false,
    email: "",
    id: 0,
    name: "",
    role: "",
    updated_at: "",
  });
   
  const getLoggedUser = async () => {
    const user = await loginService.loggedUser();
    setUserLogged(user.data);
  };
  
  const role = userLogged.role;
  console.log(userLogged);
  
  
  
  const [currentOption, setCurrentOption] = useState<string>("");
  const getCurrentOption = (option: string) => {
    setCurrentOption(option);
  };
  
  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <main className="backoficce_main-container">
      <Header loggedUser={userLogged} />
      <section className="backoficce_content-container">
        <Navbar userRole={role} navOptionSelected={getCurrentOption} />
        <section className="backoficce-content">
          {currentOption ? <Lists userRole={role} navOption={currentOption} /> : <Home loggedUser={userLogged} />}
        </section>
      </section>
    </main>
  );
};


export default Backoficce;
