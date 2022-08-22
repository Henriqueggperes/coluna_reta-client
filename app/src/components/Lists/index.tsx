import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";
import { Students } from "../../mocks/Students/students.mocks";
import { ToastContainer, toast } from "react-toastify";
import { studentObj, sValueObj, userObj } from "../../types/types";
import institutionService from "../../services/institutionService";
import studentsService from "../../services/studentsService";
import magnifier from "./../../assets/icons/search_icon.svg";
import filter from "./../../assets/icons/filter_icon.svg";
import arrow from "./../../assets/icons/back_arrow_icon.svg";
import filterArrowIcon from "./../../assets/icons/filter_arrow_icon.svg";
import StudentsCards from "../StudentsCards";
import PaginationComponent from "../PaginationComponent";
import "./style.css";
import UsersCard from "../UsersCards";
import ListIcon from "../ListIcon";
import InstCards from "../InstCards";
import userService from "../../services/userService";

//**COLOCAR AS INTERFACES NA PASTA TYPES DEPOIS**

const Lists = (props: { userRole: string; navOption: string }) => {
  useEffect(() => {
    if (props.navOption == "Alunos") {
      StudentData();
    } else if (props.navOption == "Ger.Usuários") {
      userData();
    } else if (props.navOption == "Ger.Instituições") {
      InstData();
    }
  }, [props.navOption]);

  const [searchedStudents, setSearchedStudents] = useState<studentObj[]>([]);
  const [searchValue, setSearchValue] = useState<sValueObj>({
    search: "",
  });

  const [usersInfo, setUsersInfo] = useState<userObj[]>([]);

  const [filterActive, setFilterActive] = useState<string>("");

  const [searchedStudents, setSearchedStudents] = useState<studentObj[]>([]);

  const [filterContainerActive, setFilterContainerActive] =
    useState<string>("");

  const [selectedInst, setSelectedInst] = useState<string>("");

  const [studentsInfo, setStudentsInfo] = useState<studentObj[]>([]);

  const [studentsPerPage, setStudentsPerPage] = useState(5);

  const [itensPerPage, setItensPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(0);

  //PAGINAÇÃO INSTITUIÇÕES//
  const [InstInfo, setInstInfo] = useState<instObj[]>([]);
  const pagesInst = Math.ceil(InstInfo.length / itensPerPage);
  const startIndexInst = currentPage * itensPerPage;
  const endIndexInst = startIndexInst + itensPerPage;
  const currentInst = InstInfo.slice(startIndexInst, endIndexInst);
  //PAGINAÇÃO INSTITUIÇÕES//

  
  //PAGINAÇÃO ESTUDANTES//
  const [studentsInfo, setStudentsInfo] = useState<studentObj[]>([]);
  const pages = Math.ceil(studentsInfo.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentStudents = studentsInfo.slice(startIndex, endIndex);
  //PAGINAÇÃO ESTUDANTES//

  const userData = async () => {
    const response = await userService.getAllUsers();
    setUsersInfo(response.data.data);
    if (response.data.message) {
      toast.error(response.data.message, {
        position: "top-right",
        className: "toast-class",
        closeButton: false,
      });
    }
  };

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const StudentData = async () => {
    const response = await studentsService.getAllStudents();
    setStudentsInfo(response.data.data);
    if (response.data.message) {
      toast.error(response.data.message, {
        position: "top-right",
        className: "toast-class",
        closeButton: false,
      });
    }
  };

  const InstData = async () => {
    const response = await institutionService.getAllInstitutions();
    setInstInfo(response.data.data);
    console.log(response.data.data);
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue({
      ...searchValue,
      [event.target.name]: event.target.value,
    });
  };


  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await studentsService.searchStudent(searchValue);
    setSearchedStudents(response.data.data);
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
    setSelectedInst(event.target.innerText);
    setFilterActive("");
  };

  const handleClearSearch = () => {
    setSearchedStudents([]);
  };

  const NextPage = () => {
    if (props.navOption == "Alunos") {
      if (currentPage + 1 > pages - 1) {
        console.log("Página indisponivel");
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const PreviousPage = () => {
    if (props.navOption == "Alunos") {
      if (currentPage - 1 < 0) {
        console.log("Página indisponivel");
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <section className="component-container">

      {props.navOption == "Alunos" ? (
        <form
          onSubmit={handleSearch}
          className="students_list_search_filter-container"
        >
          <button className="students_search-button">
            <img className="students_search_button-image" src={magnifier}></img>
          </button>
          <input
            required
            className="students_search-input"
            placeholder="Pesquisar aluno"
            onChange={handleChanges}
            name="search"
          ></input>

          <div className="students_search_institution_filter_button-container">

      <form
        onSubmit={handleSearch}
        className="students_list_search_filter-container"
      >
        <button className="students_search-button">
          <img className="students_search_button-image" src={magnifier}></img>
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
            <img
              src={filterArrowIcon}
              className={`filter-arrow__icon-${filterActive}`}
            ></img>
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
          {props.userRole == "ADMIN" ? (
            <ListIcon navOption={props.navOption} />
          ) : (
            ""
          )}
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
          </div>
        </form>
      ) : (
        ""
      )}
      <section className="students_list-container">
        <section className="option-list">
          {props.userRole == "ADMIN" ? (
            <ListIcon navOption={props.navOption} />
          ) : (
            ""
          )}
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

          <section className="list_cards-container">
            {props.navOption == "Alunos" ? (
              <StudentsCards
                navOption={props.navOption}
                currentStudents={currentStudents}
                StudentData={studentsInfo}
                searchStudents={searchedStudents}
                userRole = {props.userRole}
              />
            ) : props.navOption == "Ger.Usuários" ? (
              <UsersCard userData={usersInfo} />
            ) : props.navOption == "Ger.Instituições" ? (
              <InstCards InstData={InstInfo} currentInst={currentInst} /> 
            ) : (
              ""
            )}
          </section>
          {searchedStudents.length > 0 ?(
            ""
          ) : (
          <div className="paginationMainComp">
            <CgChevronLeft className="previous" onClick={PreviousPage} />
            <PaginationComponent
              pages={props.navOption == "Alunos" ? pages : pagesInst}
              setCurrentPage={setCurrentPage}
            />
            <CgChevronLeft className="next" onClick={NextPage} />
          </div>

        </section>
      </section>
    </section>
  );
};

export default Lists;
