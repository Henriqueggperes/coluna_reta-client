import React from "react";
import { Students } from "../../mocks/Students/students.mocks";
import students_icon from "./../../assets/icons/students_icon.svg"
import "./style.css";

//A PROP searchedStudents É DO TIPO: studentObj[]
const StudentsCards = (props:{searchStudents:any}) => {

  console.log(props.searchStudents)
  return (
    <>
      {props.searchStudents.length!=0? props.searchStudents.map((item:any) => (
        <div className="StudentsCard" key={item.id}>
          <img src={students_icon} alt="" />
          <div className="CardInfo">
            <div className="student_card_info-name student-info">
              <label>Nome:</label> <span>{item.name}</span>
            </div>
            <div className="student_card_info-institution student-info">
              <label>Instituição:</label> <span> </span>{item.institution}
            </div> 
          </div>
        </div>
      )):
      Students.map((item) => (
        <div className="StudentsCard" key={item.id}>
          <img src={students_icon} alt="" />
          <div className="CardInfo">
            <div className="student_card_info-name student-info">
              <label>Nome:</label> <span>{item.name}</span>
            </div>
            <div className="student_card_info-institution student-info">
              <label>Instituição:</label> <span> </span>{item.institution}
            </div> 
          </div>
        </div>
      ))}
    </>
  );
};

export default StudentsCards;
