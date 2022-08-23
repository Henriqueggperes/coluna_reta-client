import api from "./api";

const institutionService = {
  getAllInstitutions: (page:number) =>
    api
      .get("/institution/all", {
        params: {
          page
        }
      })
      .then((response: any) => response)
      .catch((error: any) => error.response),

  getInstitutionById: (id: number) =>
    api
      .get(`institution/search/${id}`)
      .then((response) => response)
      .catch((error) => error.response),
};


export default institutionService;
