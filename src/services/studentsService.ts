import { toast } from "react-toastify";
import {
  consultationType,
  patchStudentObj,
  studentObj,
  sValueObj,
} from "../types/types";
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

  searchStudent: (value: sValueObj, page: number) =>
    api
      .post("student/search", value, {
        params: {
          page,
        },
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

  getVisitsHistory: (id: number, page: number) =>
    api
      .get(`historic/find/${id}`, {
        params: {
          page,
        },
      })
      .then((response) => response)
      .catch((error) => error.response),

  postAppointment: (values: consultationType) =>
    api
      .post("historic/make-appointment", values)
      .then((response) => response)
      .catch((error) => error.response),
};

export default studentsService;
