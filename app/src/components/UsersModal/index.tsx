import "./style.css";
import close_icon from "./../../assets/icons/close_icon.svg";
import filterArrowIcon from "./../../assets/icons/filter_arrow_icon.svg";
import React, { useEffect, useState } from "react";
import institutionService from "../../services/institutionService";
import { institutionObj, userObj } from "../../types/types";
import { CgChevronLeft } from "react-icons/cg";
import { CgChevronRight } from "react-icons/cg";
import { toast } from "react-toastify";
import userService from "../../services/userService";

const UsersModal = (props: {userInfo:userObj|any ,type:string, closeModal: Function }) => {
  
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
   
  useEffect(()=>{
    setUser(props.userInfo)
  },[])

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>)=>{
     setUser({
        ...user,
       [event.target.name]: event.target.value,
     })
  }
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault()
      const response = await userService.postUser({...user,
      id: undefined,
      institution_id: Number(institution)
    })
      if(response.data){
        toast.success('Usuário registrado com sucesso!')
      }
      else {
        console.log(response.error.message)
      }
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
      <form onSubmit={handleSubmit} className="users-modal--form">
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
                required={props.type=='CREATE'? true : false}
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
                required={props.type=='CREATE'? true : false}
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
                required={props.type=='CREATE'? true : false}
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
                required={props.type=='CREATE'? true : false}
                className="users-modal-form--input"
              />
              <label htmlFor="name" className="users-modal-form--label">
                Senha <span className="password-regex">(Caracter especial, letra maiúscula, minúscula e numeros)</span>
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
                  required={props.type=='CREATE'? true : false}
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
                        <span onClick={()=>setInstitution(Number(inst.id))} className="user-institution-span">
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
