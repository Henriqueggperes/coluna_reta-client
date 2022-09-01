import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./style.css";
import AppointmentModal from "../AppointmentModal";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { studentObj, userObj } from "../../types/types";
import loginService from "../../services/authService";
import studentsService from "../../services/studentsService";
import StudentModal from "../StudentModal";
import StudentHistory from "../StudentHistory";
import LoadingModal from "../LoadingModal";
import RegisterVisitModal from "../RegisterVisitModal";


const Student = () => {
  
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const params = useParams();
  
 
  const [isInfoLoading,setIsInfoLoading] = useState<boolean>(false)

  const [student,setStudent] = useState<studentObj>({
    id:0,
    name:'',
    phone:'',
    birth_date:"",
    institution_id: 0,
    institution:{
      id:0,
      name: ''
    },
    historic: undefined
  });

  
  const [userLogged, setUserLogged] = useState<userObj>({
    created_at: "",
    deleted: false,
    email: "",
    id: 0,
    name: "",
    role: "",
    updated_at: "",
    institution_id: [],
  });

  const getStudent = async ()=>{
    setIsInfoLoading(true)
    const id = Number(params.id)
    const response = await studentsService.getStudentByID(id)
    if(response){
      setIsInfoLoading(false)
    }
    setStudent(response.data);
  }
  
  const getLoggedUser = async () => {
    const user = await loginService.loggedUser();
    setUserLogged(user.data);
  };
  
  useEffect(() => {
    getLoggedUser();
    getStudent();
  }, []);
  
  useEffect(() => {
    if (!jwt) {
      toast.error("Realize o login antes de acessar o backoffice");
      navigate("/");
    }
  });
  
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false)
  
  const [isAppointmentModalOpen,setIsAppointmentModalOpen] = useState<boolean>(false)
  
  
  const handleStudentModal = ()=>{
      setIsStudentModalOpen(!isStudentModalOpen)
  }
  
  const handleAppointMentModal= ()=>{
    setIsAppointmentModalOpen(!isAppointmentModalOpen)
  }
 
  return (
    <>
      {/* <Navbar navOptionSelected={getCurrentOption}></Navbar> */}
      <main className='chosen-student-main__container'>
        <Header></Header>
        <section className="unique-student-card__container">
          <div className="chosen-student-info--container">
            <div className="chosen-student-heading">
              <span className="heding-student--name">{student?.name}</span>
              <span className="heding-student--institution">
                {student?.institution?.name}
              </span>
            </div>
            <div className="chosen-student--info">
              <div className="chosen-student--history">
                <h1 className="history--heading">Histórico</h1>
                <div className="history--content">
                 <StudentHistory/>
                </div>
              </div>
              <div className="aditional-student-info--container">
                <h1 className="aditional-info-container--heading">
                  Informações adicionais
                </h1>
                <div className="adtional-info--container">
                  <label htmlFor="" className="aditional-info--label">
                    Nscto.:
                  </label>
                  <span className="adtional--info">{student?.birth_date}</span>
                  <label htmlFor="" className="aditional-info--label">
                    Telefone:
                  </label>
                  <span className="adtional--info">{student?.phone}</span>
                </div>
              </div>
            </div>
            <div className="student-schedule-button--container">
              <button onClick={handleAppointMentModal} className="student-schedule--button">
                AGENDAR CONSULTA
              </button>
              {userLogged.role=='ADMIN'?
                <button onClick={handleStudentModal} className="student-schedule--button">
                ALTERAR INFORMAÇÕES
              </button>:""}
            </div>
          </div>
        </section>
      </main>
      {isStudentModalOpen?<StudentModal type="EDIT" studentInfo={student} closeModal={handleStudentModal}/>:""}
      {isAppointmentModalOpen?<AppointmentModal closeModal={handleAppointMentModal}/>:''}
      {isInfoLoading? <LoadingModal/> : ''}
    </>
  );
};

export default Student;
