import React from "react";
import { Students } from "../../mocks/Students/students.mocks";
import students_icon from "./../../assets/icons/students_icon.svg"
import "./style.css";

const StudentsCards = () => {
  return (
    <section className="students_list_cards-container">
      {Students.map((item) => (
        <div className="StudentsCard">
          <img src={students_icon} alt="" />
          <div className="CardInfo">
            <p className="student_card_info-name student-info">
              <b>Nome:</b> {item.name}
            </p>
            <p className="student_card_info-institution student-info">
              <b>Instituição:</b> {item.institution}
            </p> 
          </div>
        </div>
      ))}
    </section>
  );
};

export default StudentsCards;
