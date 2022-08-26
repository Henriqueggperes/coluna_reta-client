import "./style.css";
import { institutionObj, studentObj, userObj } from "../../types/types";
import studentsService from "../../services/studentsService";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import institutionService from "../../services/institutionService";
import { useState } from "react";

const DeleteModal = (props: {
  navOption: string;
  element: studentObj | userObj | institutionObj | undefined;
  closeModal: Function;
}) => {
   const deleteElement = async (id: number) => {    
    
    let response;   
    
    if(props.navOption=='Alunos'){
    response =  await studentsService.deleteStudent(id);
    console.log(response);
    if (response.data) {
      toast.success("Aluno apagado com sucesso");
      props.closeModal();
    } else if (response.data.message) {
      toast.error(response.data.message);
    }}

    else if(props.navOption=='Ger.Usuários'){
      response =  await userService.deleteUser(id);
      if (response.status == 204) {
        toast.success("Usuário apagado com sucesso");
        props.closeModal();
      } else if (response.data.message) {
        toast.error(response.data.message);
      }
    }

    else if(props.navOption=='Ger.Instituições'){
      response =  await institutionService.deleteInstitution(id);
      if (response.data) {
        toast.success("Instituição apagada com sucesso");
        props.closeModal();
      } else if (response.data.message) {
        toast.error(response.data.message);
      }
    }
    
  };

  const handleDelete = (id: any) => {
    if (props.navOption == "Alunos") {
      deleteElement(id);
    } else if (props.navOption == "Ger.Usuários") {
      deleteElement(id);
    } else if (props.navOption == "Ger.Instituições") {
      deleteElement(id);
    }
  };

  return (
    <section className="delete-modal--container">
      <div className="delete--modal">
        <div className="delete-modal-heading--container">
          <div className="delete-modal-heading--info">
            <h1 className="delete-modal--heading">Deletar</h1>
            <span className="delete-modal--span">
              Deseja realmente excluir{` `}
              <span className="element--highlight">
                {props.element?.name}
              </span>{" "}
              do backoficce?
            </span>
          </div>
        </div>

        <div className="delete-modal-buttons--container">
          <button
            onClick={(event) => handleDelete(props.element?.id)}
            className="delete-modal--button confirm"
          >
            DELETAR
          </button>
          <button
            onClick={(event) => props.closeModal()}
            className="delete-modal--button deny"
          >
            VOLTAR
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
