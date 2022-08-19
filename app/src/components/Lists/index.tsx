import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";
import { Students } from "../../mocks/Students/students.mocks";
import { ToastContainer, toast } from "react-toastify";
import { studentObj } from "../../types/types";
import studentsService from "../../services/studentsService";
import magnifier from "./../../assets/icons/search_icon.svg";
import filter from "./../../assets/icons/filter_icon.svg";
import arrow from "./../../assets/icons/back_arrow_icon.svg";
import filterArrowIcon from "./../../assets/icons/filter_arrow_icon.svg";
import StudentsCards from "../StudentsCards";
import PaginationComponent from "../PaginationComponent";
import "./style.css";

//**COLOCAR AS INTERFACES NA PASTA TYPES DEPOIS**
interface sValueObj {
  search: string;
}

const Lists = (props: { navOption: any }) => {
  const [searchValue, setSearchValue] = useState<sValueObj>({
    search: "",
  });

  const [searchedStudents, setSearchedStudents] = useState<studentObj[]>([]);

  const [filterActive, setFilterActive] = useState<string>("");

  const [filterContainerActive, setFilterContainerActive] = useState<string>("");

  const [selectedInst, setSelectedInst] = useState<string>("");

  const [studentsInfo, setStudentsInfo] = useState<studentObj[]>([]);
  
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(studentsInfo.length / studentsPerPage);
  const startIndex = currentPage * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentItens = studentsInfo.slice(startIndex, endIndex);

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    StudentData();
  }, []);

  const StudentData = async () => {
    if (!jwt) {
      toast.error("Erro! Faça login antes de consultar essa informação", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-class",
        closeButton: false,
        delay: 5000,
      });
      navigate("/");
    } else {
      const response = await studentsService.getAllStudents();
      setStudentsInfo(response.data.data);
      console.log(response.data.data);
    }
  };

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue({
        ...searchValue,
        [event.target.name]: event.target.value,
      });
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
      // if (searchValue.search) {
      //   event.preventDefault();
      //   const filter: studentObj[] = studentsInfo.filter((student) => {
      //     if (student.name.includes(searchValue.search)) {
      //       return student;
      //     }
      //     // TARTATIVA DE ERRO AQUI: ELSE{ALUNO NÃO ENCONTRADO}
      //   });
      //   setSearchedStudents(filter);
      // }
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

    const NextPage = () => {
      if (currentPage + 1 > pages - 1) {
        console.log("Página indisponivel");
      } else {
        setCurrentPage(currentPage + 1);
      }
    };

    const PreviousPage = () => {
      if (currentPage - 1 < 0) {
        console.log("Página indisponivel");
      } else {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
      <section className="component-container">
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
              <StudentsCards StudentData={studentsInfo} searchStudents={searchedStudents} />
            </section>

            <div className="paginationMainComp">
              <CgChevronLeft className="previous" onClick={PreviousPage} />
              <PaginationComponent
                pages={pages}
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
