import { toast } from "react-toastify";
import api from "./api";

const studentsService = {
    getAllStudents:()=>api.get('/student/all')
    .then((response: any) => response)
    .catch((error: any)=> error.response)
}

export default studentsService;