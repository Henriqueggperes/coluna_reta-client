import api from "./api";

const institutionService = {
    getInstitutionById: (id:number)=>api.get(`institution/search/${id}`)
    .then((response)=>response)
    .catch((error)=>error.response)
}

export default institutionService;