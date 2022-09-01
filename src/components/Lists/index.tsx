import React, { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MetaType, postInstitutionObj, studentObj, sValueObj, userObj } from "../../types/types";
import { institutionObj } from "../../types/types";
import studentsService from "../../services/studentsService";
import magnifier from "../../assets/icons/search_icon.svg";
import filter from "../../assets/icons/filter_icon.svg";
import arrow from "../../assets/icons/back_arrow_icon.svg";
import filterArrowIcon from "../../assets/icons/filter_arrow_icon.svg";
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
import loginService from "../../services/authService";
import InstitutionModal from "../InstitutionModal";
import LoadingModal from "../LoadingModal";
import Institution from "../Institution";
import LoadingModal from "../LoadingModal";


const Lists = (props: { userRole: string; navOption: string }) => {
  useEffect(() => {
    getInstitutions();
    if (props.navOption == "Alunos") {
      StudentData(1);
    } else if (props.navOption == "Ger.Usuários") {
      userData(1);
    } else if (props.navOption == "Ger.Instituições") {
      InstData(1);
    }
  }, [props.navOption]);

  const [refresh, setRefresh] = useState<boolean>(false);
  
  const [institutions,setInstitutions] = useState<postInstitutionObj[]>([])

  const [searchedStudents, setSearchedStudents] = useState<studentObj[]>([]);

  const [searchValue, setSearchValue] = useState<sValueObj>({
    search: "",
    filter: "",
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
      institution_id: [],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isInfoLoading,setIsInfoLoading] = useState<boolean>(false)

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

  const [InstInfo, setInstInfo] = useState<postInstitutionObj[]>([
    {
      name: "",
      phone_number: "",
      state: "",
      city: "",
      zip_code: "",
    },
  ]);

  const refreshList = () => {
    setRefresh(!refresh);
  };

  const getInstitutions = async () => {
    const response = await institutionService.getInstitutions();
    setInstitutions(response.data);
  };

  const userData = async (page: number) => {

    setIsInfoLoading(true)
    const response = await userService.getAllUsers(page);
    if(response){
      setIsInfoLoading(false)
    }
    setUsersInfo(response.data.data);
    setMetaData(response.data.meta);
    if (response.data.message) {
      toast.error(response.data.message);
    }
  };

  const StudentData = async (page: number) => {
    setIsInfoLoading(true)
    const response = await studentsService.getAllStudents(page);
    if(response){
      setIsInfoLoading(false)
    }
    setStudentsInfo(response.data.data);
    setMetaData(response.data.meta);
    if (response.data.message) {
      toast.error(response.data.message);
    }
  };

  const InstData = async (page: number) => {
    setIsInfoLoading(true)
    const response = await institutionService.getAllInstitutions(page);
    if(response){
      setIsInfoLoading(false)
    }
    setInstInfo(response.data.data);
    setMetaData(response.data.meta);
    if (response.data.message) {
      toast.error(response.data.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue({
      ...searchValue,
      search: event.target.value,
    });
  };

  const handleModal = (event: any) => {
    setIsModalOpen(!isModalOpen);
  };


  const handleSearch = async (event: any,page:number) => {
    setIsInfoLoading(true)
    event.preventDefault();
    const response = await studentsService.searchStudent({
      ...searchValue,
     filter: selectedInst
    },page);
    if(response){
      setIsInfoLoading(false)
    }
    setSearchedStudents(response.data.data);
    setMetaData(response.data.meta);
  };

  const searchPage = async (page: number) => {
    const response = await studentsService.searchStudent(
      {
        ...searchValue,
        filter: selectedInst,
      },
      page
    );
    setSearchedStudents(response.data.data);
    setMetaData(response.data.meta);
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
    StudentData(1);
  };

  const handleClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;

    if (props.navOption == "Alunos" && searchedStudents.length < 1) {
      StudentData(page);
    }
    if (props.navOption == "Alunos" && searchedStudents.length > 0) {
      searchPage(page);
    } else if (props.navOption == "Ger.Usuários") {
      userData(page);
    } else if (props.navOption == "Ger.Instituições") {
      InstData(page);
    }
  };
  useEffect(() => {
    getInstitutions();
    if (props.navOption == "Alunos") {
      StudentData(1);
    } else if (props.navOption == "Ger.Usuários") {
      userData(1);
    } else if (props.navOption == "Ger.Instituições") {
      InstData(1);
    }
  }, [refresh]);

  return (
    <section className="component-container">
      {props.navOption == "Alunos" ? (
        <form
          onSubmit={(event) => handleSearch(event, 1)}
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
              {institutions.map((inst) => (
                <div className="filter-dropdown__item" onClick={handleFilter}>
                  {inst.name}
                </div>
              ))}
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
      <section className="students_list-container">
        <section className="option-list">
          <div className="list-icon--container">
            {props.userRole == "ADMIN" ? (
              <ListIcon handleModal={handleModal} navOption={props.navOption} />
            ) : (
              ""
            )}
          </div>
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
                refreshComp={refreshList}
                navOption={props.navOption}
                currentStudents={studentsInfo}
                searchStudents={searchedStudents}
                userRole={props.userRole}
              />
            ) : props.navOption == "Ger.Usuários" ? (
              <UsersCard
                refreshComp={refreshList}
                navOption={props.navOption}
                userRole={props.userRole}
                userData={usersInfo}
              />
            ) : props.navOption == "Ger.Instituições" ? (
              <InstCards
                refreshComp={refreshList}
                InstData={InstInfo}
                navOption={props.navOption}
                userRole={props.userRole}
              />
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
          refreshComp={refreshList}
          type="CREATE"
          studentInfo={undefined}
          closeModal={closeModal}
        />

      ) : isModalOpen && props.navOption == "Ger.Usuários" ? (
        <UsersModal
          refreshComp={refreshList}
          userInfo={undefined}
          type="CREATE"
          closeModal={closeModal}
        />
      ) : isModalOpen && props.navOption == "Ger.Instituições" ? (
        <InstitutionModal
          handleModal={handleModal}
          refreshComp={refreshList}
          instInfo={InstInfo}
          type="CREATE"
          closeModal={closeModal}
        />
      ) : (
        ""
      )}
      {isInfoLoading ? <LoadingModal /> : ""}

    </section>
  );
};

export default Lists;
