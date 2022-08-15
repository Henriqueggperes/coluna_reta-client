import React, { useEffect, useState } from "react";
import "./style.css";

import magnifier from "./../../assets/icons/search_icon.svg";
import filter from "./../../assets/icons/filter_icon.svg";
import arrow from "./../../assets/icons/back_arrow_icon.svg";

import StudentsCards from "../StudentsCards";

import { Students } from "../../mocks/Students/students.mocks";

//**COLOCAR AS INTERFACES NA PASTA TYPES DEPOIS**

interface sValueObj {
  search: string;
}

interface studentObj {
  id: number; //**  MUDAR PARA STRING DEPOIS ( VAI RECEBER UM ID HASH ) **
  name: string;
  birthDate: string;
  number: number;
  institution: string;
}

const Lists = (props: { navOption: any }) => {
  const [searchValue, setSearchValue] = useState<sValueObj>({
    search: "",
  });

  const [student, setStudent] = useState<studentObj>({
    id: 0,
    name: "",
    birthDate: "",
    number: 0,
    institution: "",
  });

  const [searchedStudents, setSearchedStudents] = useState<studentObj[]>([]);

  const [filterActive, setFilterActive] = useState<string>("");

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue({
      ...searchValue,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handleSearch = () => {
    const filter: studentObj[] = Students.filter((student) => {
      if (student.name.includes(searchValue.search)) {
        return student;
      }
      // TARTATIVA DE ERRO AQUI: ELSE{ALUNO NÃO ENCONTRADO}
    });
    setSearchedStudents(filter);
  };

  const onClickFilter = ()=>{
    if(filterActive == 'active'){
      setFilterActive('')
    }
    else{
      setFilterActive('active')
    }
  }

  const handleClearSearch = () => {
    setSearchedStudents([]);
  };
  console.log(searchedStudents);

  return (
    <section className="component-container">
      <div className="students_list_search_filter-container">
        <div className="students_search-button">
          <img
            className="students_search_button-image"
            src={magnifier}
            onClick={handleSearch}
          ></img>
        </div>
        <input
          className="students_search-input"
          placeholder="Pesquisar aluno"
          onChange={handleChanges}
          name="search"
        ></input>
        <div className="students_search_institution_filter_button-container">
          <div
            className={`students_search_institution_filter-button ${filterActive}`}
            onClick={onClickFilter}
          >
            <img className="filter-icon" src={filter}></img>
          </div>
          <div className={`filter-dropdown__container-${filterActive}`}>
            <div className="filter-dropdown__item">la</div>
            <div className="filter-dropdown__item">aqui</div>
            <div className="filter-dropdown__item">acola</div>
            <div className="filter-dropdown__item">ali</div>
          </div>
        </div>
      </div>
      <section className="students_list-container">
        <section className="students-list">
          {searchedStudents.length > 0 ? (
            <div
              className="all-list-elements__option"
              onClick={handleClearSearch}
            >
              <img
                className="back-arrow__image"
                src={arrow}
                alt="Seta preta com detalhe roxo para retornar á lista principal"
              />
            </div>
          ) : (
            ""
          )}
          <section className="students_list_cards-container">
            <StudentsCards searchStudents={searchedStudents} />
          </section>
          <div className="students_list-pagination">PAGINAÇÃO</div>
        </section>
      </section>
    </section>
  );
};

export default Lists;
