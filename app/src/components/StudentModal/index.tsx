import "./style.css";
import close_icon from "./../../assets/icons/close_icon.svg";
import React, { useEffect, useState } from "react";
import { patchStudentObj, studentObj } from "../../types/types";
import studentsService from "../../services/studentsService";
import { toast } from "react-toastify";
import { NONAME } from "dns";

const StudentModal = (props: {
  type: string;
  closeModal: Function;
  studentInfo: studentObj | any;
}) => {
  const [student, setStudent] = useState<studentObj>({
    name: "",
    birth_date: "",
    phone: "",
    institution_id: 0,
    address_id: 0,
    id: 0,
    created_at: '',
    deleted: false,
    updated_at:'',
    institution:{},
    address:{}    
  });

  
  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let response;
    if (props.type == "CREATE") {
      response = await studentsService.createStudent(student);
      if (response.data.data) {
        toast.success("Estudante adicionado com sucesso!");
        props.closeModal();
      } else if (response.data.message) {
        toast.error(response.data.message);
      }
    } else if (props.type == "EDIT") {
      response = await studentsService.updateStudent(student.id, {...student,
        address:undefined,
        institution:undefined,
        id:undefined,
        created_at:undefined,
        updated_at:undefined
      });
      if (response.data.data) {
        toast.success("Estudante editado com sucesso!");
        props.closeModal();
      } else if (response.data.error) {
        console.log(response.data.error);
      }
    }
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setStudent({
      ...student,
      [event.target.name]: event.target.innerHTML,
    });
    console.log(student.name)
  };

  useEffect(() => {
    setStudent(props.studentInfo);
  },[]);
  
  return (
    <section className="student-modal--container">
      <form className="student-modal--form" onSubmit={handleSend}>
        <div className="student-modal-form--header">
          <h1 className="student-modal-form--heading">
            {props.type == "EDIT" ? "Editar estudante" : "Adicionar estudante"}
          </h1>
          <img
            onClick={(event) => props.closeModal()}
            className="student-modal-form--close-button"
            src={close_icon}
            alt="Icone com um xis para fechar a aba de adicionar estudante"
          />
        </div>
        <div className="student-modal-form-inputs--container">
          <div className="inputs-labels--container">
            <label htmlFor="name" className="input--label">
              Nome
            </label>
            <input
              onChange={handleChanges}
              name="name"
              type="text"
              className="student-modal-form--input"
              placeholder={props.type == "EDIT" ? student.name : ""}
              required={props.type == "EDIT" ? false : true}
            />
          </div>
          <div className="inputs-labels--container">
            <label className="input--label">Data de nascimento</label>
            <input
              onChange={handleChanges}
              name="birth_date"
              type="text"
              className="student-modal-form--input"
              placeholder={props.type == "EDIT" ? student.birth_date : ""}
              required={props.type == "EDIT" ? false : true}
            />
          </div>
          <div className="inputs-labels--container">
            <label className="input--label">Telefone</label>
            <input
              onChange={handleChanges}
              name="phone"
              type="text"
              className="student-modal-form--input"
              placeholder={props.type == "EDIT" ? student.phone : ""}
              required={props.type == "EDIT" ? false : true}
            />
          </div>
          <div className="inputs-labels--container">
            <label className="input--label">Instituição</label>
            <input
              onChange={handleChanges}
              name="institution_id"
              type="text"
              className="student-modal-form--input"
              placeholder={
                props.type == "EDIT" ? student.institution_id.toString() : ""
              }
              required={props.type == "EDIT" ? false : true}
            />
          </div>
          {/* <div className="inputs-labels--container">
            <label className="input--label"></label>
            <input
              name="address_id"
              type="text"
              className="student-modal-form--input"
            />
          </div> */}
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

export default StudentModal;
