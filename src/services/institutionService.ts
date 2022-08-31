import { institutionObj, postInstitutionObj } from "../types/types";
import api from "./api";

const institutionService = {
  //GET ALL COM PAGINAÇÃO
  getAllInstitutions: (page: number) =>
    api
      .get("/institution/all", {
        params: {
          page,
        },
      })
      .then((response: any) => response)
      .catch((error: any) => error.response),

  postInstitution: (values: postInstitutionObj) =>
    api
      .post("institution/create", values)
      .then((response: any) => response)
      .catch((error: any) => error.response),

  getInstitutionById: (id: number) =>
    api
      .get(`institution/search/${id}`)
      .then((response) => response)
      .catch((error) => error.response),

  getInstitutions: () =>
    api
      .get("institution/all/institutions")
      .then((response) => response)
      .catch((error) => error.response),

  deleteInstitution: (id: number) =>
    api
      .delete(`institution/delete/${id}`)
      .then((response) => response)
      .catch((error) => error.response),

  updateInstitution: (id: number, values: postInstitutionObj) =>
    api
      .patch(`institution/update/${id}`, values)
      .then((response) => response)
      .catch((error) => error.response),
};

export default institutionService;
