import "./style.css";
import { institutionObj, studentObj, userObj } from "../../types/types";
import studentsService from "../../services/studentsService";

const DeleteModal = (props: {
  navOption: string;
  element: studentObj | userObj | institutionObj;
  closeModal: Function;
}) => {
  const deleteStudent = async (id:number) => {
    const response = await studentsService.deleteStudent(id);
    console.log(response)
    props.closeModal();
  };

  const handleDelete = (id: number) => {
    if (props.navOption == "Alunos") {
        deleteStudent(id)
      };
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
                {props.element.name}
              </span>{" "}
              do backoficce?
            </span>
          </div>
        </div>

        <div className="delete-modal-buttons--container">
          <button
            onClick={(event) => handleDelete(props.element.id)}
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
