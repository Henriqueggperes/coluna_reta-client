import React from "react";
import {
  addressType,
  institutionObj,
  patchStudentObj,
  postInstitutionObj,
  studentObj,
} from "../../types/types";
import close_icon from "./../../assets/icons/close_icon.svg";
import { useEffect, useState } from "react";
import studentsService from "../../services/studentsService";
import filter_arrow from "../../assets/icons/filter_arrow_icon.svg";
import { toast } from "react-toastify";
import institutionService from "../../services/institutionService";
import addressService from "../../services/addressService";
import "./style.css";
import ModalAddress from "../AddressModal";


const InstitutionModal = (props: {
  refreshComp:Function;
  type: string;
  closeModal: Function;
  handleModal: Function;
  instInfo: postInstitutionObj | any;
}) => {
  const [institution, setInstitution] = useState<postInstitutionObj>({
    name: "",
    phone_number: "",
    state: "",
    city: "",
    zip_code: "",
  });

  const [createInstitution, setCreateInstitution] =
    useState<postInstitutionObj>({
      name: "",
      phone_number: "",
      state: "",
      city: "",
      zip_code: "",
    });

  const handleSendInst = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response;

    if (props.type === "CREATE") {
      response = await institutionService.postInstitution({
        ...createInstitution,
      });

      if (response.status == 201) {
        toast.success("Instituição adicionada com sucesso!");
        props.closeModal();
      } else {
        toast.error(response.data.message[0]);
        props.closeModal();
      }
    } else if (props.type === "EDIT") {
      response = institutionService.updateInstitution(Number(institution.id), {
        ...institution,
        id: undefined,
        name: institution.name,
        phone_number: institution.phone_number,
        state: institution.state,
        city: institution.city,
        zip_code: institution.zip_code,
        created_at: undefined,
        updated_at: undefined,
        _count: undefined,
        deleted: undefined,
      });
    }

    if (response.status === 200 && props.type == "CREATE") {
      toast.success("Instituição adicionada com sucesso!");
      props.refreshComp()
      props.closeModal();
    } else if (response.status === 200 && props.type == "EDIT") {
      toast.success("Instituição alterada com sucesso!");
      props.closeModal();
    }
    if (response) {
      console.log(response.status == 400);
      toast.error(response.data.message[0]);
      props.closeModal();
    }
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCreateInstitution({
      ...createInstitution,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setInstitution(props.instInfo);
  }, []);

  return (
    <section className="institution-modal--container">
      <form className="institution-modal--form" onSubmit={handleSendInst}>
        <div className="institution-modal-form--header">
          <h1 className="institution-modal-form--heading">
            {props.type == "EDIT"
              ? "Editar Instituição"
              : "Adicionar Instituição"}
          </h1>
          <img
            onClick={(event) => props.closeModal()}
            className="institution-modal-form--close-button"
            src={close_icon}
            alt="Icone com um 'X' para fechar a aba de adicionar estudante"
          />
        </div>

        <div className="institution-modal-form-inputs--container">
          <div className="inputs-labels--container">
            <input
              onChange={handleChanges}
              name="name"
              type="text"
              autoComplete="off"
              className="institution-modal-form--input"
              placeholder={props.type == "EDIT" ? institution.name : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label htmlFor="name" className="input--label">
              Nome da Instituição
            </label>
          </div>

          <div className="inputs-labels--container">
            <input
              onChange={handleChanges}
              name="phone_number"
              type="text"
              autoComplete="on"
              className="institution-modal-form--input"
              placeholder={props.type == "EDIT" ? institution.phone_number : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label htmlFor="phone_number" className="input--label">
              Telefone
            </label>
          </div>

          <div className="inputs-labels--container">
            <input
              onChange={handleChanges}
              name="state"
              type="text"
              autoComplete="on"
              className="institution-modal-form--input"
              placeholder={props.type == "EDIT" ? institution.state : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label htmlFor="state" className="input--label">
              Estado - UF
            </label>
          </div>
          
          <div className="inputs-labels--container">
            <input
              onChange={handleChanges}
              name="city"
              type="text"
              autoComplete="off"
              className="institution-modal-form--input"
              placeholder={props.type == "EDIT" ? institution.city : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label htmlFor="city" className="input--label">
              Cidade
            </label>
          </div>
          
          <div className="inputs-labels--container">
            <input
              onChange={handleChanges}
              name="zip_code"
              type="text"
              autoComplete="off"
              className="institution-modal-form--input"
              placeholder={props.type == "EDIT" ? institution.zip_code : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label htmlFor="zip_code" className="input--label">
              CEP
            </label>
          </div>

        </div>
        <div className="student-modal-form-send-button--container">
          <button className="send--button">
            {props.type == "EDIT" ? "EDITAR" : "CRIAR"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default InstitutionModal;
