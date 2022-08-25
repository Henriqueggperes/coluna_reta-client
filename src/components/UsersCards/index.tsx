import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/userCard.png";
import { userObj } from "../../types/types";
import DeleteModal from "../DeleteModal";
import "./style.css";

const UsersCard = (props: {navOption:string , userRole: string , userData: userObj[] }) => {
 
 const [isDeleteModalOpen,setIsDeleteModalOpen] = useState<boolean>() 
 const [userToDelete,setUserToDelete] = useState<userObj>() 
 
  
  const handleModal = (event: any, element: userObj) => {
    if (isDeleteModalOpen) {
      setIsDeleteModalOpen(false);
      console.log(isDeleteModalOpen);
    } else {
      console.log(isDeleteModalOpen);
      setIsDeleteModalOpen(true);
      setUserToDelete(element);
    }
  };
 
  return (
    <>
      {props.userData.map((item:userObj)=>(
        <section className="user--card">
          <Link className="unique-user--link" to={`/backoffice-user/${item.id}`}>
          <img className="user--icon" src={UserIcon} />
          </Link>
          <div className="user-info--container">
            <div className="info--content">
              <label htmlFor="" className="user-info--label">
                Nome:
              </label>
              <span className="user--info">
                {item.name.split(' ')[0]}
                {' '}
                {item.name.split(' ')[1]}
              </span>
            </div>
            <div className="info--content">
              <label htmlFor="" className="user-info--label">
                Função:
              </label>
              <span className={item.role=='ADMIN'?"user--info admin": 'user--info'}>{item.role}</span>
            </div>
          </div>
            {props.userRole == "ADMIN" ? (
                <div className="trash-can-icon--container">
                  <BiTrash
                    onClick={(event) => handleModal(event,item )}
                    className="trash-can-icon"
                  />
                </div>
              ) : (
                ""
              )}
        </section>
      ))}
      {isDeleteModalOpen ? (
        <DeleteModal
          navOption={props.navOption}
          element = {userToDelete}
          closeModal={handleModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UsersCard;
