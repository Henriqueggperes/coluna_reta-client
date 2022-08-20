import React, { useState } from 'react'
import { instObj } from '../../types/types';
import { FaRegBuilding } from "react-icons/fa";
import InstIcon from "../../assets/icons/Insticon.svg";

const InstCards = (props: {InstData: instObj[]}) => {

  

  return (
    <>
      {props.InstData.map((institution: instObj) => (
            <div className="StudentsCard" key={institution.name}>
               {/* <Link className="chosen-student__link" to={`/backoffice-student/${student.id}`}> */}
                <img className="student-icon" src={InstIcon} alt="" />
                {/* </Link>  */}
              <div className="CardInfo">
                <div className="student_card_info-name student-info">
                  <label className="student-name label">Instituição:</label>{" "}
                  <span className="student-name span">{`${institution.name.split(" ")[0]} ${
                    institution.name.split(" ")[1]
                  }`}</span>
                </div>
                <div className="student_card_info-institution student-info">
                  <label className="student-institution label">
                    Telefone:
                  </label>{" "}
                  <span className="student-institution span">{institution.phone_number} </span>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default InstCards;

//TODO NA POC DA PAGINAÇÃO, TESTAR ESSA API E NAS PROPRIEDADES DA LIB DA PAGINAÇÃO, INFORMAR OS DADOS QUE JÁ VEM NA RESPONSE DA API