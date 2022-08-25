import "./style.css";
import close_icon from "../../assets/icons/close_icon.svg";
import filterArrowIcon from "../../assets/icons/filter_arrow_icon.svg";
import React, { useEffect, useState } from "react";
import institutionService from "../../services/institutionService";
import { institutionObj, userObj } from "../../types/types";
import { CgChevronLeft } from "react-icons/cg";
import { CgChevronRight } from "react-icons/cg";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import { userInfo } from "os";

const UsersModal = (props: {
  userInfo: userObj | any;
  type: string;
  closeModal: Function;
}) => {
  
  
  useEffect(() => {    
    setUser(props.userInfo);
  }, []);
 
  const [allInsts, setAllInsts] = useState<institutionObj[]>();
  
  const [dropdownActive, setDropdownActive] = useState<string>("");
  
  const [page, setPage] = useState<number>(1);
  
  const [user, setUser] = useState<userObj>({
    id: 0,
    name: "",
    email: "",
    role: "",
    institution_id: [],
  });


  
  const [selectedInsts, setSelectedInsts] = useState<number[]>([]);
  
  const setInstitutions = (id: number) => {
    setSelectedInsts([...selectedInsts, id]);
    console.log(selectedInsts);
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await userService.postUser({
      ...user,
      id: undefined,
      institution_id: selectedInsts,
    });
    if (response) {
      toast.success(response.message);
    } else {
      console.log(response.error.message);
    }
  };
  
  const getAllInstitutions = async () => {
    const response = await institutionService.getInstitutions();
    setAllInsts(response.data);
    console.log(response.data.data);
  };
  
  const handleDropdown = () => {
    if (dropdownActive == "") {
      setDropdownActive("-active");
      getAllInstitutions();
    } else {
      setDropdownActive("");
    }
  };
  

  
  return (
    <section className="users-modal--container">
      <form onSubmit={handleSubmit} className="users-modal--form">
        <div className="users-modal-form--header">
          <h1 className="users-modal-form--heading">
            {props.type == "EDIT" ? "Editar" : "Criar"} um usuário
          </h1>
          <img
            onClick={(event) => props.closeModal()}
            className="user-modal-form-close--icon"
            src={close_icon}
            alt="Icone com um xis para fechar a aba de adicionar usuário"
            />
        </div>
        <div className="user-form-content--container">
          <div className="user-form-inputs--container">
            <div className="user-form-input-label--container">
              <input
                name="name"
                type="text"
                value={props.type == "EDIT" ? props.userInfo.name : ""}
                onChange={handleChanges}
                autoComplete="off"
                className="users-modal-form--input"
                required={props.type == "CREATE" ? true : false}
              />
              <label htmlFor="name" className="users-modal-form--label">
                Nome
              </label>
            </div>
            <div className="user-form-input-label--container">
              <input
                name="role"
                type="text"
                value={props.type == "EDIT" ? props.userInfo.role : ""}
                onChange={handleChanges}
                autoComplete="off"
                required={props.type == "CREATE" ? true : false}
                className="users-modal-form--input"
              />
              <label htmlFor="name" className="users-modal-form--label">
                Função
              </label>
            </div>
            <div className="user-form-input-label--container">
              <input
                name="email"
                type="email"
                value={props.type == "EDIT" ? props.userInfo.email : ""}
                onChange={handleChanges}
                autoComplete="off"
                required={props.type == "CREATE" ? true : false}
                className="users-modal-form--input"
              />
              <label htmlFor="name" className="users-modal-form--label">
                E-mail
              </label>
            </div>
            <div className="user-form-input-label--container institution--container">
            <div className="user-input--filter">
                <ul className="institutions-list">
                  {
                    props.userInfo.institutions.map((item:any)=>(
                    <li>{item.id}</li>                      
                    ))
                  }
                </ul>
                <label
                  htmlFor="institution_id"
                  className="users-modal-form--label user-intitution"
                >
                  Instituições (ID)
                </label>
              </div> 

               <div className="user-institution-filter-arrow-icon--container">
                <img
                  onClick={handleDropdown}
                  className={`user-institution-filter-arrow--icon${dropdownActive}`}
                  src={filterArrowIcon}
                />
              </div> 
              { dropdownActive ? (
                <>
                  <div className="user-dropdown--container">
                    <div className="dropdown-content">
                      {allInsts?.map((inst) => (
                        <span
                          onClick={() => setInstitutions(inst.id)}
                          className="user-institution-span"
                        >
                          {inst.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="create-user-button--container">
            <button className="create-user--button">
              {props.type == "EDIT" ? "EDITAR" : "CRIAR"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UsersModal;
