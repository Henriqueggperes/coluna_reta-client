import React, { useState } from "react";
import { institutionObj } from "../../types/types";
import { Link } from "react-router-dom";
import { FaRegBuilding } from "react-icons/fa";
import InstIcon from "../../assets/icons/Insticon.svg";
import "./style.css";

//currentInst: instObj[] 
const InstCards = (props: { InstData: institutionObj[] }) => {
  return (
    <>
      {props.InstData.map((institution: instObj) => (
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
              <span className="span">
                {institution.phone_number}{" "}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default InstCards;

//TODO NA POC DA PAGINAÇÃO, TESTAR ESSA API E NAS PROPRIEDADES DA LIB DA PAGINAÇÃO, INFORMAR OS DADOS QUE JÁ VEM NA RESPONSE DA API
