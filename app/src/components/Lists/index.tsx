import "./style.css";
import magnifier from "./../../assets/icons/search_icon.svg";
import filter from "./../../assets/icons/filter_icon.svg";
import { Students } from "../../mocks/Students/students.mocks";
const Lists = () => {
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
          <section className="students_list_cards-container">
            {Students.map((item) => (
              <div className="CardInstituicoes">
                <img src={magnifier} alt="" />

                <div className="CardInfo">
                  <p>
                    <b>Nome:</b> E.M Rui Barbosa
                  </p>
                  <p className="card_info-adress">
                    <b>Estado:</b> SP
                  </p>
                  <p>
                    <b>Cidade:</b> São Paulo 
                  </p>
                  <p>
                    <b>CEP:</b> XXXXX-XX
                  </p>
                </div>
              </div>
            ))}
          </section>
          <div className="students_list-pagination">PAGINAÇÃO</div>
        </section>
      </section>
    </section>
  );
};

export default Lists;
