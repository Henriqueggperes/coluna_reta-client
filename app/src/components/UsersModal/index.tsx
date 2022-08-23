import "./style.css";
import close_icon from "./../../assets/icons/close_icon.svg";
import filterArrowIcon from "./../../assets/icons/filter_arrow_icon.svg";
import React, { useState } from "react";
import institutionService from "../../services/institutionService";
import { institutionObj, userObj } from "../../types/types";
import { CgChevronLeft } from "react-icons/cg";
import { CgChevronRight } from "react-icons/cg";
import { toast } from "react-toastify";

const UsersModal = (props: { closeModal: Function }) => {
  
  const [allInsts, setAllInsts] = useState<institutionObj[]>();

  const [dropdownActive, setDropdownActive] = useState<string>("");

  const [page, setPage] = useState<number>(1);

  const [user,setUser] = useState<userObj>({
    id:0,
    name:'',
    email:'',
    role:'',
    institution_id:0,
  })

  const [institution,setInstitution] = useState<number>()

   
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>)=>{
     setUser({
        ...user,
       [event.target.name]: event.target.value
     })
     console.log(user);
  }


  const getAllInstitutions = async () => {
    const response = await institutionService.getAllInstitutions(page);
    setAllInsts(response.data.data);
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
      <form className="users-modal--form">
        <div className="users-modal-form--header">
          <h1 className="users-modal-form--heading">Criar um usuário</h1>
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
                onChange={handleChanges}
                autoComplete="off"
                className="users-modal-form--input"
                required
              />
              <label htmlFor="name" className="users-modal-form--label">
                Nome
              </label>
            </div>
            <div className="user-form-input-label--container">
              <input
                name="role"
                type="text"
                onChange={handleChanges}
                autoComplete="off"
                required
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
                onChange={handleChanges}
                autoComplete="off"
                required
                className="users-modal-form--input"
              />
              <label htmlFor="name" className="users-modal-form--label">
                E-mail
              </label>
            </div>
            <div className="user-form-input-label--container">
              <input
                name="passwordHash"
                type="password"
                onChange={handleChanges}
                autoComplete="off"
                required
                className="users-modal-form--input"
              />
              <label htmlFor="name" className="users-modal-form--label">
                Senha
              </label>
            </div>
            <div className="user-form-input-label--container institution--container">
              <div className="user-input--filter">
                <input
                  name="institution_id"
                  type="number"
                  onChange={handleChanges}
                  autoComplete="off"
                  value={institution}
                  required
                  className="users-modal-form--input"
                />
                <label
                  htmlFor="institution_id"
                  className="users-modal-form--label user-intitution"
                >
                  Instituição (ID)
                </label>
              </div>
              <div className="user-institution-filter-arrow-icon--container">
                <img
                  onClick={handleDropdown}
                  className={`user-institution-filter-arrow--icon${dropdownActive}`}
                  src={filterArrowIcon}
                />
              </div>
              {dropdownActive ? (
                <>
                  <div className="user-dropdown--container">
                    <div className="dropdown-content">
                      {allInsts?.map((inst) => (
                        <span onClick={()=>setInstitution(inst.id)} className="user-institution-span">
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
            <button className="create-user--button">CRIAR</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UsersModal;
