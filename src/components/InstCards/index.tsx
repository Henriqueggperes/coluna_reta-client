import React, { useState } from "react";
import { institutionObj } from "../../types/types";
import { Link } from "react-router-dom";
import { FaRegBuilding } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import InstIcon from "./../../assets/icons/InstIcon.svg";
import "./style.css";
import DeleteModal from "../DeleteModal";

const InstCards = (props: { InstData: institutionObj[]; userRole: string, navOption: string }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [institutionToDelete, setInstitutionToDelete] =
    useState<institutionObj>({
      id: 0,
      name: "",
      phone_number: "",
      address_id: 0,
      created_at: "",
      updated_at: "",
      deleted: false,
    });

    console.log(props.InstData);
    

  const handleModal = (event: any, element: institutionObj) => {
    if(isDeleteModalOpen) {
      setIsDeleteModalOpen(false);      
    } else {
      setIsDeleteModalOpen(true);
      setInstitutionToDelete(element)
    }
  };

  return (
    <>
      {props.InstData.map((institution: institutionObj) => (
        <div className="InstCard" key={institution.name}>
          <img className="inst-icon" src={InstIcon} alt="" />
          <div className="InstInfo">
            <div className="inst_card_info-name inst-info">
              <label className="inst-name label">Instituição:</label>{" "}
              <span className="inst-name span">{`${
                institution.name.split(" ")[0]
              } ${institution.name.split(" ")[1]}`}</span>
            </div>
            <div className="inst-info">
              <label className="label">Telefone:</label>{" "}
              <span className="span">{institution.phone_number} </span>
            </div>
          </div>
          <div>
            {props.userRole == "ADMIN" ? (
              <div className="trash-can-icon--container-Inst">
                <BiTrash 
                className="trash-can-icon-Inst"
                onClick={(event) => handleModal(event, institution)} 
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
      {isDeleteModalOpen ? (
        <DeleteModal 
        navOption={props.navOption}
        element={institutionToDelete}
        closeModal={handleModal}
        />
      ) : ""}
    </>
  );
};

export default InstCards;
