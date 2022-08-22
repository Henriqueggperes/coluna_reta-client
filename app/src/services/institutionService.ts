import api from "./api";

const institutionService = {
  getAllInstitutions: () =>
    api
      .get("/institution/all")
      .then((response: any) => response)
      .catch((error: any) => error.response),
};

export default institutionService;
