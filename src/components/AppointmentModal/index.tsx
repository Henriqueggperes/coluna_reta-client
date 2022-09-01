import "./style.css";
import close from "../../assets/icons/close_icon.svg";
import React, { useState } from "react";
import studentsService from "../../services/studentsService";
import { consultationType } from "../../types/types";
import { toast } from "react-toastify";

const AppointmentModal = (props: { closeModal: any }) => {
  const [appointment, setAppointment] = useState<consultationType>({
    student_id: 0,
    clinic: "",
    consultation_date: "",
  });

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.value,
    });
    console.log(event);
  };

  const handlePostAppointment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await studentsService.postAppointment(appointment);
    
    if (response.status == 200) {
      toast.success('Usuário editado com sucesso!')
      props.closeModal();
    } 
    
    if(response.data.message) {
      toast.error(response.data.message);
      props.closeModal();
    } 
  };

  return (
    <>
      <section className="appointment-modal--container">
        <form onSubmit={handlePostAppointment} className="appointment-modal-form">
          <div className="appointment-modal-form-heading--container">
            <h1 className="appointment-modal-form--heading">Consulta médica</h1>
            <img
              className="close--icon"
              src={close}
              onClick={props.closeModal}
            ></img>
          </div>

          <div className="appointment-modal-form--content">
            <div className="appointment-modal-form-shcedule">
              <label htmlFor="clinic" className="appointment-modal-form--span">
                Clinica:
              </label>
              <input
                required
                className="appointment-form-input"
                type="text"
                name="clinic"
                onChange={handleChanges}
              ></input>
            </div>

            <div className="appointment-modal-form-shcedule">
              <label htmlFor="date" className="appointment-modal-form--span">
                Data para a consulta:
              </label>
              <input
                required
                className="appointment-form-input"
                type="date"
                name="date"
                onChange={handleChanges}
              ></input>
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
