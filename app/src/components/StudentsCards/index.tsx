import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { studentObj } from "../../types/types";
import studentsService from "../../services/studentsService";
import institutionService from "../../services/institutionsService";

import students_icon from "./../../assets/icons/students_icon.svg";
import { BiTrash } from "react-icons/bi";
import DeleteModal from "../DeleteModal";

const StudentsCards = (props: {
  navOption: string;
  StudentData: studentObj[];
  searchStudents: studentObj[];
  currentStudents: studentObj[];
  userRole: string;
}) => {
  console.log(props.searchStudents);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<studentObj>({
    id: 0,
    name: "",
    birth_date: "",
    phone: "",
    institution_id: 0,
    address_id: 0,
    created_at: "",
    updated_at: "",
    deleted: false,
  });
  const [students, setStudents] = useState<studentObj[]>([]);

  const handleModal = (event: any, element: studentObj) => {
    if (isModalOpen) {
      setIsModalOpen(false);
      console.log(isModalOpen);
    } else {
      console.log(isModalOpen);
      setIsModalOpen(true);
      setStudentToDelete(element);
    }
  };

  useEffect(() => {
    setStudents(
      props.currentStudents.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  });

  return (
    <>
      {props.searchStudents.length != 0
        ? props.searchStudents.map((item: studentObj) => (
            <div className="StudentsCard" key={item.id}>
              <Link
                className="chosen-student__link"
                to={`/backoffice-student/${item.id}`}
              >
                <img className="student-icon" src={students_icon} alt="" />
              </Link>
              <div className="CardInfo">
                <div className="student_card_info-name student-info">
                  <label className="student-name label">Nome:</label>{" "}
                  <span className="student-name span">{`${
                    item.name.split(" ")[0]
                  } ${item.name.split(" ")[1]}`}</span>
                </div>
                <div className="student_card_info-institution student-info">
                  <label className="student-institution label">
                    Instituição:
                  </label>{" "}
                  <span className="student-institution span"></span>
                </div>
              </div>
              {props.userRole == "ADMIN" ? (
                <div className="trash-can-icon--container">
                  <BiTrash
                    onClick={(event) => handleModal(event, item)}
                    className="trash-can-icon"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        : students.map((student: studentObj, index) => (
            <div className="StudentsCard" key={student.id}>
              <Link
                className="chosen-student__link"
                to={`/backoffice-student/${student.id}`}
              >
                <img className="student-icon" src={students_icon} alt="" />
              </Link>
              <div className="CardInfo">
                <div className="student_card_info-name student-info">
                  <label className="student-name label">Nome:</label>{" "}
                  <span className="student-name span">{`${
                    student.name.split(" ")[0]
                  } ${student.name.split(" ")[1]}`}</span>
                </div>
                <div className="student_card_info-institution student-info">
                  <label className="student-institution label">
                    Instituição:
                  </label>{" "}
                  <span className="student-institution span">
                    {student.institution_id}
                  </span>
                </div>
              </div>
              {props.userRole == "ADMIN" ? (
                <div className="trash-can-icon--container">
                  <BiTrash
                    onClick={(event) => handleModal(event, student)}
                    className="trash-can-icon"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
      {isModalOpen ? (
        <DeleteModal navOption={props.navOption} element={studentToDelete} closeModal={handleModal} />
      ) : (
        ""
      )}
    </>
  );
};

export default StudentsCards;
