import { addressType } from "../types/types";
import api from "./api";

const addressService = {
  getAllAddress: () =>
    api
      .get("address/all")
      .then((response: any) => response)
      .catch((error: any) => error.response),

  postAddress: (values: addressType) =>
    api
      .post("address/create", values)
      .then((response: any) => response)
      .catch((error: any) => error.response),
};

export default addressService;
