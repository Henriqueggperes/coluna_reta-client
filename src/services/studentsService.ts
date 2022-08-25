import { toast } from "react-toastify";
import { patchStudentObj, studentObj, sValueObj } from "../types/types";
import api from "./api";

const studentsService = {
  getAllStudents: (page: number) =>
    api
      .get("student/all", {
        params: {
          page,
        },
      })
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        return error.response;
      }),

  getStudentByID: (id: number) =>
    api
      .get(`student/search/${id}`)
      .then((response: any) => response)
      .catch((error: any) => {
        return error.response;
      }),

  searchStudent: (value: sValueObj,page:number) =>
    api
      .post("student/search", value,{
        params:{ 
          page
        }
      })
      .then((response) => response)
      .catch((error) => error.response),

  deleteStudent: (id: number) =>
    api
      .delete(`student/${id}`)
      .then((response) => response)
      .catch((error) => error.response),

  createStudent: (values: studentObj) =>
    api
      .post("student", values)
      .then((response) => response)
      .catch((error) => error.response),

  updateStudent: (id: number, values: studentObj) =>
    api
      .patch(`student/${id}`, values)
      .then((response) => response)
      .catch((error) => error.response.data),
};

export default studentsService;
