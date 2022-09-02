import "./style.css";
import cam from "./../../assets/img/cam.png";
import React, { ChangeEvent, useMemo, useState } from "react";
import close_icon from "./../../assets/icons/close_icon.svg";
import { RiFolderUploadLine } from "react-icons/ri";
import { awsUploadService } from "../../services/awsUploadService";
import { toast } from "react-toastify";
import LoadingModal from "../LoadingModal";
import { registerVisitObj } from "../../types/types";
import studentsService from "../../services/studentsService";
import { useParams } from "react-router-dom";

const RegisterVisitModal = (props: { closeModal: Function }) => {
  
  
   const id = useParams()

  const [isInfoLoading, setIsInfoLoading] = useState<boolean>();

  const [thumbnail1, setThumbnail1] = useState<any>();
  const preview1 = useMemo(() => {
    return thumbnail1 ? URL.createObjectURL(thumbnail1[0]) : null;
  }, [thumbnail1]);

  const [thumbnail2, setThumbnail2] = useState<any>(null);
  const preview2 = useMemo(() => {
    return thumbnail2 ? URL.createObjectURL(thumbnail2[0]) : null;
  }, [thumbnail2]);

  const [formValues, setFormValues] = useState<registerVisitObj>({
    cobb_angle: "",
    forwarding: "",
    image_1: "",
    image_2: "",
    return_date: "",
    student_id: 1,
  });

  const [image1, setImage1] = useState<string>("");

  const [image2, setImage2] = useState<string>("");

  const sendImage1 = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsInfoLoading(true);
    const formData = new FormData();
    formData.append("file", thumbnail1[0], thumbnail1[0].name);
    const response = await awsUploadService.uploadImage(formData);
    if (response) {
      setIsInfoLoading(false);
    }
    if (response.status == 201) {
      console.log(response.data);
      toast.success("Imagem enviada para o banco!");
      setImage1(response.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const sendImage2 = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsInfoLoading(true);
    const formData = new FormData();
    formData.append("file", thumbnail2[0], thumbnail2[0].name);
    const response = await awsUploadService.uploadImage(formData);
    if (response) {
      setIsInfoLoading(false);
    }
    if (response.status == 201) {
      console.log(response.data);
      toast.success("Imagem enviada para o banco!");
      setImage2(response.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    console.log(formValues);
  };

  const handleSendForm = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsInfoLoading(true)
    event.preventDefault();
    const response = await studentsService.registerVisit({
      ...formValues,
     student_id: Number(id.id),
     image_1: image1,
     image_2: image2,
    })
    if(response){
      setIsInfoLoading(false)
    }
    if(response.status == 201){
      toast.success('Visita registrada no histórico com sucesso!')
      props.closeModal()
    }
     else{
      toast.error(response.data.message)
      props.closeModal()
     }
  };

  return (
    <section className="register-visit-modal--container">
      <section className="register-visit-modal--form">
        <div className="register-visit-modal-heading--container">
          <h1 className="register-visit--heading">REGISTRO VISITA</h1>
          <img
            onClick={(event) => props.closeModal()}
            className="visit-modal-form-close--icon"
            src={close_icon}
            alt="Icone com um xis para fechar a aba de adicionar usuário"
          />
        </div>
        <div className="register-visit-images-forms--container">
          <form
            className="register-visit-image--form"
            encType="multipart/form-data"
          >
            <label
              className={`cam ${thumbnail1 ? "has-thumbnail" : ""}`}
              style={{ backgroundImage: `url(${preview1})` }}
            >
              <img src={cam} alt="Imagem de um desenho de uma câmera" />
              <input
                name="file"
                onChange={(event) => setThumbnail1(event.target.files)}
                className="register-image--input"
                type="file"
              />
            </label>
            <div className="send-image-buton--container">
              <RiFolderUploadLine
                className="send-image--button"
                onClick={(event) => sendImage1(event)}
              />
              <span className="send-image--span">Enviar imagem</span>
              {/* <button className="send-image--span">Enviar imagem</button> */}
            </div>
          </form>

          <div className="register-visit-image--form">
            <label
              className={`cam ${thumbnail2 ? "has-thumbnail" : ""}`}
              style={{ backgroundImage: `url(${preview2})` }}
            >
              <img src={cam} alt="Imagem de um desenho de uma câmera" />
              <input
                onChange={(event) => {
                  setThumbnail2(event.target.files);
                }}
                className="register-image--input"
                type="file"
              />
            </label>
            <div className="send-image-buton--container">
              <RiFolderUploadLine
                onClick={(event) => sendImage2(event)}
                className="send-image--button"
              />
              <span className="send-image--span">Enviar imagem</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSendForm} className="register-visit-from-inputs--container">
          <div className="register-visit-form--inputs">
            <div className="register-visit-input--container">
              <input
                onChange={handleChanges}
                required
                name="forwarding"
                className="register-visit--input"
                type="text"
              />
              <label className="register-visit-input--label">
                Encaminhamento
              </label>
            </div>
            <div className="register-visit-input--container">
              <input
                onChange={handleChanges}
                required
                name="cobb_angle"
                className="register-visit--input"
                type="text"
              />
              <label className="register-visit-input--label">
                Ângulo de Cobb
              </label>
            </div>
            <div className="register-visit-input--container">
              <input
                onChange={handleChanges}
                required
                name="return_date"
                className="register-visit--input"
                type="text"
              />
              <label className="register-visit-input--label">
                Data de retorno (Ex: 14/08/2022)
              </label>
            </div>
          </div>
          <section className="register-visit-form-button--container">
            <button className="register-visit-send--button">
              Confirmar visita
            </button>
          </section>
        </form>
      </section>
      {isInfoLoading ? <LoadingModal /> : ""}
    </section>
  );
};

export default RegisterVisitModal;
