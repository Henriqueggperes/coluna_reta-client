import "./style.css";
import magnifier from "./../../assets/icons/search_icon.svg";
import filter from "./../../assets/icons/filter_icon.svg";
import { Students } from "../../mocks/Students/students.mocks";
import StudentsCards from "../StudentsCards";

const Lists = (props:{navOption:any}) => {

  const studentsList = {...Students}

  return (
    <section className="students_list_component-container">
      <div className="students_list_search_filter-container">
        <div className="students_search-button">
          <img className="students_search_button-image" src={magnifier}></img>
        </div>
        <input
          className="students_search-input"
          placeholder="Pesquisar aluno"
        ></input>
        <div className="students_search_institution_filter_button-container">
          <div className="students_search_institution_filter-button">
            <span className="institution_filter-span">Instituições</span>
            <img className="institution_filter-icon" src={filter}></img>
          </div>
        </div>
      </div>
      <section className="students_list-container">
        <section className="students-list">

            <StudentsCards></StudentsCards>
          
          <div className="students_list-pagination">PAGINAÇÃO</div>
        </section>
      </section>
    </section>
  );
};

export default Lists;
