import React, { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MetaType, studentObj, sValueObj, userObj } from "../../types/types";
import { institutionObj } from "../../types/types";
import studentsService from "../../services/studentsService";
import magnifier from "./../../assets/icons/search_icon.svg";
import filter from "./../../assets/icons/filter_icon.svg";
import arrow from "./../../assets/icons/back_arrow_icon.svg";
import filterArrowIcon from "./../../assets/icons/filter_arrow_icon.svg";
import StudentsCards from "../StudentsCards";
import "./style.css";
import UsersCard from "../UsersCards";
import ListIcon from "../ListIcon";
import InstCards from "../InstCards";
import userService from "../../services/userService";
import institutionService from "../../services/institutionService";
import StudentModal from "../StudentModal";
import UsersModal from "../UsersModal";
import ReactPaginate from "react-paginate";

const Lists = (props: { userRole: string; navOption: string }) => {
  useEffect(() => {
    if (props.navOption == "Alunos") {
      StudentData(1);
    } else if (props.navOption == "Ger.Usuários") {
      userData(1);
    } else if (props.navOption == "Ger.Instituições") {
      InstData(1);
    }
  }, [props.navOption]);

  const [searchedStudents, setSearchedStudents] = useState<studentObj[]>([]);

  const [searchValue, setSearchValue] = useState<sValueObj>({
    search: "",
  });

  const [usersInfo, setUsersInfo] = useState<userObj[]>([
    {
      created_at: "",
      deleted: false,
      email: "",
      id: 0,
      name: "",
      role: "",
      updated_at: "",
      institution_id: 0,
    },
  ]);

  const [filterActive, setFilterActive] = useState<string>("");

  const [filterContainerActive, setFilterContainerActive] =
    useState<string>("");

  const [selectedInst, setSelectedInst] = useState<string>("");

  const [studentsInfo, setStudentsInfo] = useState<studentObj[]>([
    {
      birth_date: "",
      id: 0,
      institution_id: 0,
      phone: "",
      name: "",
    },
  ]);

  const [metaData, setMetaData] = useState<MetaType>({
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 1,
    orderByColumn: "",
    page: 1,
    pageCount: 1,
    take: 1,
  });

  const [InstInfo, setInstInfo] = useState<institutionObj[]>([
    {
      address_id: 0,
      created_at: "",
      deleted: false,
      id: 0,
      name: "",
      phone_number: "",
      updated_at: "",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>();

  const userData = async (page: number) => {
    const response = await userService.getAllUsers(page);
    setUsersInfo(response.data.data);
    setMetaData(response.data.meta);
    if (response.data.message) {
      toast.error(response.data.message);
    }
  };

  const StudentData = async (page: number) => {
    const response = await studentsService.getAllStudents(page);
    setStudentsInfo(response.data.data);
    setMetaData(response.data.meta);
    if (response.data.message) {
      toast.error(response.data.message);
    }
  };

  const InstData = async (page: number) => {
    const response = await institutionService.getAllInstitutions(page);
    setInstInfo(response.data.data);
    setMetaData(response.data.meta);
    if (response.data.message) {
      toast.error(response.data.message);
    }
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue({
      ...searchValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleModal = (event: any) => {
    setIsModalOpen(!isModalOpen);
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

  const handleClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;

    if (props.navOption == "Alunos") {
      StudentData(page);
    } else if (props.navOption == "Ger.Usuários") {
      userData(page);
    } else if (props.navOption == "Ger.Instituições") {
      InstData(page);
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
      ) : (
        ""
      )}
      <section className="students_list-container">
        <section className="option-list">
          {props.userRole == "ADMIN" ? (
            <ListIcon handleModal={handleModal} navOption={props.navOption} />
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
                currentStudents={studentsInfo}
                searchStudents={searchedStudents}
                userRole={props.userRole}
              />
            ) : props.navOption == "Ger.Usuários" ? (
              <UsersCard userData={usersInfo} />
            ) : props.navOption == "Ger.Instituições" ? (
              <InstCards InstData={InstInfo} />
            ) : (
              ""
            )}
          </section>
          <div className="pagination-main-comp">
            <ReactPaginate
              pageCount={metaData.pageCount}
              nextLabel={">"}
              previousLabel={"<"}
              breakLabel={"..."}
              marginPagesDisplayed={3}
              pageRangeDisplayed={3}
              onPageChange={(selectedItem: { selected: number }) =>
                handleClick(selectedItem)
              }
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </section>
      </section>
      {isModalOpen && props.navOption == "Alunos" ? (
        <StudentModal
          type="CREATE"
          studentInfo={undefined}
          closeModal={handleModal}
        />
      ) : isModalOpen && props.navOption == "Ger.Usuários" ? (
        <UsersModal closeModal={handleModal} />
      ) : (
        ""
      )}
    </section>
  );
};

export default Lists;
