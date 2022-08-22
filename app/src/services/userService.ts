import api from "./api";

const userService = {
   getAllUsers: ()=>api.get('user/all')
   .then((response)=>response)
   .catch((error)=>error.response)
}

export default userService;