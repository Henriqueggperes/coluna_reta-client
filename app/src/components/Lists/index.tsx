import React, { FormEvent, useEffect, useState } from "react";
import style from "./style.css";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import magnifier from "./../../assets/icons/search_icon.svg";
import filter from "./../../assets/icons/filter_icon.svg";
import arrow from "./../../assets/icons/back_arrow_icon.svg";
import filterArrowIcon from "./../../assets/icons/filter_arrow_icon.svg"

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

  const [filterContainerActive, setFilterContainerActive] = useState<string>("");

  const [selectedInst, setSelectedInst] = useState<string>("");

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue({
      ...searchValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    if(searchValue.search){
      event.preventDefault()
      const filter: studentObj[] = Students.filter((student) => {
        if (student.name.includes(searchValue.search)) {
          return student;
        }
         // TARTATIVA DE ERRO AQUI: ELSE{ALUNO NÃO ENCONTRADO}
      });
      setSearchedStudents(filter);
    }
  };

  const onClickFilter = () => {
    if (filterActive == "active") {
      setFilterActive("");
    } else {
      setFilterActive("active");
      setFilterContainerActive("active");
    }

  };

  const handleFilter = (event: React.BaseSyntheticEvent) => {
    console.log(event.target.innerText);
    setSelectedInst(event.target.innerText);
    setFilterActive("");
  };

  const handleClearSearch = () => {
    setSearchedStudents([]);
  };


  return (
    <section className="component-container">
      <form onSubmit={handleSearch} className="students_list_search_filter-container">
        
        <button className="students_search-button">
          <img
            className="students_search_button-image"
            src={magnifier}
          ></img>
        </button>
        <input
          required
          className="students_search-input"
          placeholder="Pesquisar aluno"
          onChange={handleChanges}
          name="search"
        ></input>

        <div className="students_search_institution_filter_button-container">
          <div
            className={`students_search_institution_filter-button`}
            onClick={onClickFilter}
          >
            {selectedInst && filterContainerActive == "active" ? (
              <span className="filter-institution">{selectedInst}</span>
            ) : (
              <img className="filter-icon" src={filter}></img>
            )}
            <img src={filterArrowIcon} className={`filter-arrow__icon-${filterActive}`}></img>
          </div>
          <div className={`filter-dropdown__container-${filterActive}`}>
            <div className="filter-dropdown__item" onClick={handleFilter}>
              la
            </div>
            <div className="filter-dropdown__item" onClick={handleFilter}>
              aqui
            </div>
            <div className="filter-dropdown__item" onClick={handleFilter}>
              acola
            </div>
            <div className="filter-dropdown__item" onClick={handleFilter}>
              ali
            </div>
          </div>
        </div>
      </form>
      <section className="students_list-container">
        <section className="option-list">
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
