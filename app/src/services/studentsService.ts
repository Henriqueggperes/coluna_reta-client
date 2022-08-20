import { toast } from "react-toastify";
import api from "./api";

const studentsService = {
    getAllStudents:()=>api.get('student/all')
    .then((response: any)=>{
        return response
    })
    .catch((error: any)=>{
        return error.response
    }),
    getStudentByID:(id:number)=>api.get(`student/${id}`)
    .then((response: any)=>  response)
    .catch((error: any)=>{
        return error.response
    })

}

export default studentsService;