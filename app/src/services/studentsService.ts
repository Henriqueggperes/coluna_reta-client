import { toast } from "react-toastify";
import api from "./api";

const studentsService = {
    getAllStudents:()=>api.get('student/a')
    .then((response)=>{
        return response
    })
    .catch((error)=>{
        // toast.error(error.response.message);
    })
}

export default studentsService;