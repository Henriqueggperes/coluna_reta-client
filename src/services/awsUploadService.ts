import api from "./api";

export const awsUploadService = {
  uploadImage: (data: any) =>
    api
      .post("upload", data, {
       headers:{
        'Content-Type': 'multipart/form-data'
       }  
    })
      .then((response) => response)
      .catch((error) => error.response),
};
