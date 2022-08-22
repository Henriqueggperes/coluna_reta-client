import React from "react";
import UserIcon from "../../assets/icons/userCard.png";
import { userObj } from "../../types/types";
import "./style.css";

const UsersCard = (props: { userData: userObj[] }) => {
  return (
    <>
      {props.userData.map((item:userObj)=>(
        <section className="user--card">
          <img className="user--icon" src={UserIcon} />
          <div className="user-info--container">
            <div className="info--content">
              <label htmlFor="" className="user-info--label">
                Nome:
              </label>
              <span className="user--info">{item.name}</span>
            </div>
            <div className="info--content">
              <label htmlFor="" className="user-info--label">
                Função:
              </label>
              <span className="user--info">{item.role}</span>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default UsersCard;
