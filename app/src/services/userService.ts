import { userObj } from "../types/types";
import api from "./api";

const userService = {
   getAllUsers: ()=>api.get('user/all')
   .then((response)=>response)
   .catch((error)=>error.response),
   
   postUser: (user:userObj)=> api.post('user/create',user)
   .then((response)=>response)
   .catch((error)=>error.response),
   
   getUserById: (id:number)=>api.get(`user/search/${id}`)
   .then((response)=>response)
   .catch((error)=>error.data)
}

export default userService;