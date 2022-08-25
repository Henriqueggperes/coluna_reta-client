import React from "react";
import { FiUser } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import './style.css'

const ListIcon = (props: { navOption: string, handleModal:Function }) => {
  return (
    <div className="icons-container">
      {props.navOption == "Ger.Instituições" ? (
        <div className="icon--container">
           <FaRegBuilding className="icon"/>
           <AiOutlinePlus className="icon"/>
        </div>
       
      ) : (
        <div onClick={(event)=>props.handleModal()} className="icon--container">
        <FiUser className="icon"/>
        <AiOutlinePlus className="icon"/>
     </div>
      )}
    </div>
  );
};

export default ListIcon;
