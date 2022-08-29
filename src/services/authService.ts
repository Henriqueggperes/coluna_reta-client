import api from "./api";
import { LoginInterface } from "../types/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginService = {
  login: (values: LoginInterface) =>
    api
      .post("auth/sign-in-user", values)
      .then((response: any) => response)
      .catch((error: any) => error.response),

   loggedUser: ()=> api.get('auth/user-logged')
   .then((response: any)=>{
     return response;
   })
   .catch((error: any)=>{
     return error.response
   })
};
export default loginService;
