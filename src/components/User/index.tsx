import "./style.css";
import Header from "../Header";
import loginService from "../../services/auth";
import { useEffect, useState } from "react";
import { userObj } from "../../types/types";
import { useParams } from "react-router-dom";
import userService from "../../services/userService";

const User = () => {

  const params = useParams()
  
  const id = Number(params.id)

  const [userLogged,setUserLogged] = useState<userObj>()

  const [user,setUser] = useState<userObj>({
    name:'',
    role: '',
    institution_id: 0,
    email: '',
    institution:{
      name: '',
    }
  })

  const getLoggedUser = async () => {
    const user = await loginService.loggedUser();
    setUserLogged(user.data.user);
  };

  const getUser = async()=>{
     const response = await userService.getUserById(id)
     setUser(response.data.data)
  }
  
  useEffect(()=>{
    getLoggedUser()
  },[])


  return (
    <main className="unique-user-main--container">
      <Header loggedUser={user} />
      <section className="unique-user--card"></section>
    </main>
  );
};

export default User;
