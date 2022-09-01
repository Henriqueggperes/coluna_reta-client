import "./style.css";
import close_icon from "../../assets/icons/close_icon.svg";
import React, { useEffect, useState } from "react";
import { institutionObj, patchStudentObj, studentObj } from "../../types/types";
import studentsService from "../../services/studentsService";
import filter_arrow from "../../assets/icons/filter_arrow_icon.svg";
import { toast } from "react-toastify";
import institutionService from "../../services/institutionService";

const StudentModal = (props: {
  refreshComp: Function;
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
  });

  const getInstitutions = async () => {
    const response = await institutionService.getInstitutions();
    setInsts(response.data);
    console.log(response.data);
  };

  const [dropdownActive, setDropdowActive] = useState<string>("");

  const [insts, setInsts] = useState<institutionObj[]>();

  const [selectedInst, setSelectedInst] = useState<number>();

  const handleDropdown = () => {
    if (dropdownActive == "-active") {
      setDropdowActive("");
    } else {
      setDropdowActive("-active");
      getInstitutions();
    }
  };

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response;
    if (props.type == "CREATE") {
      response = await studentsService.createStudent({
        ...student,
        institution_id: Number(selectedInst),
      });
      if (response.status == 201) {
        toast.success("Estudante adicionado com sucesso!");
        props.refreshComp()
        props.closeModal();
      } else if (response) {
        console.log(response.status == 400)
        toast.error(response.data.message[0]);
        props.closeModal();
      }
    } 
    else if (props.type == "EDIT") {
      response = await studentsService.updateStudent(Number(student.id), {
        ...student,
        address: undefined,
        institution: undefined,
        id: undefined,
        historic:undefined,
        created_at: undefined,
        updated_at: undefined,
        institution_id: Number(selectedInst)
      });
      if (response.data.data) {
        toast.success("Estudante editado com sucesso!");
        props.closeModal();
        props.refreshComp()
      } else if (response.data.error) {
        console.log(response.data.error);
      }
    }
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    });
    console.log(student);
  };

  useEffect(() => {
    setStudent(props.studentInfo);
  }, []);

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
            <input
              onChange={handleChanges}
              name="name"
              type="text"
              autoComplete="off"
              className="student-modal-form--input"
              placeholder={props.type == "EDIT" ? student.name : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label htmlFor="name" className="input--label">
              Nome
            </label>
          </div>

          <div className="inputs-labels--container">
            <input
              onChange={handleChanges}
              name="birth_date"
              type="text"
              autoComplete="off"
              className="student-modal-form--input"
              placeholder={props.type == "EDIT" ? student.birth_date : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label className="input--label">Data de nascimento</label>
          </div>

          <div className="inputs-labels--container">
            <input
              onChange={handleChanges}
              name="phone"
              type="text"
              autoComplete="off"
              className="student-modal-form--input"
              placeholder={props.type == "EDIT" ? student.phone : ""}
              required={props.type == "EDIT" ? false : true}
            />
            <label className="input--label">Telefone</label>
          </div>

          <div className="inputs-labels--container">
            <div className="institution-student-filter--container">
              <input
                onChange={handleChanges}
                name="institution_id"
                type="number"
                value={selectedInst}
                autoComplete="off"
                className="student-modal-form--input student-institution--input"
                placeholder={
                  props.type == "EDIT" ? student.institution_id.toString() : ""
                }
                required={props.type == "EDIT" ? false : true}
              />
              <label className="input--label student-inst-label">
                Instituição(ID)
              </label>
              <img
                onClick={handleDropdown}
                className={`student-filter-arrow--icon${dropdownActive}`}
                src={filter_arrow}
              />
            </div>

            <div
              className={`student-inst-dropdown--container${dropdownActive}`}
            >
              {insts?.map((inst) => (
                <span
                  onClick={(event) => setSelectedInst(inst.id)}
                  className={`dropdown-student--item${dropdownActive}`}
                >
                  {inst.name}
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

export default StudentModal;
