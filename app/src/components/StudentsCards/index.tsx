import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Students } from "../../mocks/Students/students.mocks";
import students_icon from "./../../assets/icons/students_icon.svg";
import "./style.css";
import studentsService from "../../services/studentsService";
import { studentObj } from "../../types/types";

//A PROP searchedStudents É DO TIPO: studentObj[]
const StudentsCards = (props: { searchStudents: studentObj[], StudentData: studentObj[], currentStudents: studentObj[]}) => {

  return (
    <>
      {props.searchStudents.length != 0
        ? props.searchStudents.map((item: any) => (
          <div className="StudentsCard" key={item.id}>
               <Link className="chosen-student__link" to={`/backoficce-student/${item.id}`}>
                <img className="student-icon" src={students_icon} alt="" />
                </Link> 
                <div className="CardInfo">
                  <div className="student_card_info-name student-info">
                    <label className="student-name label">Nome:</label>{" "}
                    <span className="student-name span">{`${item.name.split(" ")[0]} ${
                      item.name.split(" ")[1]
                    }`}</span>
                  </div>
                  <div className="student_card_info-institution student-info">
                    <label className="student-institution label">
                      Instituição:
                    </label>{" "}
                    <span>{item.institution}</span>
                  </div>
                </div>
              </div>
          ))
        : props.currentStudents.map((student: studentObj) => (
            <div className="StudentsCard" key={student.id}>
               <Link className="chosen-student__link" to={`/backoffice-student/${student.id}`}>
                <img className="student-icon" src={students_icon} alt="" />
                </Link> 
              <div className="CardInfo">
                <div className="student_card_info-name student-info">
                  <label className="student-name label">Nome:</label>{" "}
                  <span className="student-name span">{`${student.name.split(" ")[0]} ${
                    student.name.split(" ")[1]
                  }`}</span>
                </div>
                <div className="student_card_info-institution student-info">
                  <label className="student-institution label">
                    Telefone:
                  </label>{" "}
                  <span className="student-institution span">{student.phone} </span>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default StudentsCards;
