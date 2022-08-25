import api from "./api";

const addressService = {
  getAllAddress: () =>
    api
      .get("address/all")
      .then((response: any) => response)
      .catch((error: any) => error.response),
};

export default addressService;
