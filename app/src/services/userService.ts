import api from "./api";

const userService = {
   getAllUsers: (page:number)=>api.get('user/all',{
      params:{
         page
      }
   })
   .then((response)=>response)
   .catch((error)=>error.response)
}

export default userService;