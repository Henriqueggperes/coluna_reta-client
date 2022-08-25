import "./style.css";
import close from "../../assets/icons/close_icon.svg";
import React from "react";

const AppointmentModal = (props:{closeModal:any}) => {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    props.closeModal()
  }
 
  return (
    <>
    <section className="appointment-modal--container">
      <form onSubmit={handleSubmit} className="appointment-modal-form">
        <div className="appointment-modal-form-heading--container">
          <h1 className="appointment-modal-form--heading">Consulta médica</h1>
          <img className="close--icon" src={close} onClick={props.closeModal}></img>
        </div>
        <div className="appointment-modal-form--content">
          <div className="appointment-modal-form-shcedule">
            <span className="appointment-modal-form--span">
              Escolha uma data para a consulta:
            </span>
            <input required className="appointment-form-input" type="date"></input>
          </div>
        </div>
          <div className="appointment-form-button--container">
            <button className="appointment-form--button">AGENDAR</button>
          </div>
      </form>
    </section>
    </>
  );
};

export default AppointmentModal;
