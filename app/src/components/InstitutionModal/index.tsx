import React from "react";
import { addressType, institutionObj, patchStudentObj, studentObj } from "../../types/types";
import close_icon from "./../../assets/icons/close_icon.svg";
import { useEffect, useState } from "react";
import studentsService from "../../services/studentsService";
import filter_arrow from "../../assets/icons/filter_arrow_icon.svg";
import { toast } from "react-toastify";
import institutionService from "../../services/institutionService";
import addressService from "../../services/addressService";
import './style.css';

const InstitutionModal = (props: {
  type: string;
  closeModal: Function;
  instInfo: institutionObj | any;
}) => {
  const [institution, setInstitution] = useState<institutionObj>({
    name: "",
    phone_number: "",
    address_id: 0,
  });

  const [address, setAddress] = useState<addressType[]>()

  const [dropdownActive, setDropdowActive] = useState<string>("");

  const [selectedAddress, setSelectedAddress] = useState<number>();

  const getAddress = async () => {
    const response = await addressService.getAllAddress();
    setAddress(response.data)   
  }

  const handleSendInst = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.type == "CREATE") {
      const response = await institutionService.postInstitution({
        ...institution,
        address_id: Number(selectedAddress),
      });
    }
  };

  const handleDropdown = () => {
    if (dropdownActive == "-active") {
      setDropdowActive("");
    } else {
      setDropdowActive("-active");
      getAddress();
    }
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInstitution({
      ...institution,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setInstitution(props.instInfo);
    getAddress();
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
              autoComplete="off"
              className="institution-modal-form--input"
              placeholder={props.type == "EDIT" ? institution.phone_number : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label className="input--label">Telefone</label>
          </div>

          <div className="inputs-labels--container">
            <div className="address-student-filter--container">
              <input
                onChange={handleChanges}
                name="address_id"
                type="number"
                value={selectedAddress}
                autoComplete="off"
                className="institution-modal-form--input institution-address--input"
                placeholder={
                  props.type == "EDIT" ? institution.address_id?.toString() : ""
                }
                required={props.type == "EDIT" ? false : true}
              />
              <label className="input--label institution-inst-label">
                Endereço(ID)
              </label>
              <img
                onClick={handleDropdown}
                className={`institution-filter-arrow--icon${dropdownActive}`}
                src={filter_arrow}
              />
            </div>

            <div
              className={`institution-inst-dropdown--container${dropdownActive}`}
            >
              {address?.map((adrss) => (
                <span
                  onClick={(event) => setSelectedAddress(adrss.id)}
                  className={`dropdown-institution--item${dropdownActive}`}
                >
                  {adrss.street}
                </span>
              ))}
            </div>
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
