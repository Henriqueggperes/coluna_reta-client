import { toast } from "react-toastify";
import api from "./api";

const studentsService = {
    getAllStudents:()=>api.get('student/a')
    .then((response)=>{
        return response
    })
    .catch((error)=>{
        return error.response
    }),
    getStudentByID:(id:number)=>api.get(`student/${id}`)
    .then((response)=>{
        return response
    })
    .catch((error)=>{
        return error.response
    })
}

export default studentsService;