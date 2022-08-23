import { toast } from "react-toastify";
import { sValueObj } from "../types/types";
import api from "./api";

const studentsService = {
    getAllStudents:()=>api.get('student/all')
    .then((response: any)=>{
        return response
    })
    .catch((error: any)=>{
        return error.response
    }),
    
    getStudentByID:(id:number)=>api.get(`student/search/${id}`)
    .then((response: any)=>  response)
    .catch((error: any)=>{
        return error.response
    }),

    searchStudent:(value:sValueObj)=>api.post('student/search',value)
    .then((response)=>response)
    .catch((error)=>error.response),

    deleteStudent: (id:number)=>api.delete(`student/${id}`)
    .then((response)=>response)
    .catch((error)=>error.response),
    
}

export default studentsService;