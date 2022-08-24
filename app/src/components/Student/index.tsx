import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./style.css";
import doctor from "./../../assets/img/doctor_char.svg";
import AppointmentModal from "../AppointmentModal";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { studentObj, userObj } from "../../types/types";
import loginService from "../../services/auth";
import studentsService from "../../services/studentsService";
import StudentModal from "../StudentModal";

const Student = () => {
  
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const params = useParams();
  

  const [student,setStudent] = useState<studentObj>({
    id:0,
    name:'',
    phone:'',
    birth_date:"",
    institution_id: 0,
  });


  const [userLogged, setUserLogged] = useState<userObj>({
    created_at: "",
    deleted: false,
    email: "",
    id: 0,
    name: "",
    role: "",
    updated_at: "",
    institution_id:0,
  });

  const getStudent = async ()=>{
    const id = Number(params.id)
    const response = await studentsService.getStudentByID(id)
    setStudent(response.data);
  }

  const getLoggedUser = async () => {
    const user = await loginService.loggedUser();
    setUserLogged(user.data.user);
  };

  useEffect(() => {
    getLoggedUser();
    getStudent();
  }, []);

  useEffect(() => {
    if (!jwt) {
      toast.error("Realize o login antes de acessar o backoffice", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-class",
        closeButton: false,
      });
      navigate("/");
    }
  });
  
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false)

  const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  

  const handleStudentModal = ()=>{
      setIsStudentModalOpen(!isStudentModalOpen)
  }
  
  const handleCloseModal = ()=>{
    setIsModalOpen(false)
  }
  const handleOpenModal = ()=>{
    setIsModalOpen(true)
  }

  return (
    <>
      {/* <Navbar navOptionSelected={getCurrentOption}></Navbar> */}
      <main className={isModalOpen?'chosen-student-main__container modal':'chosen-student-main__container'}>
        <Header loggedUser={userLogged} ></Header>
        <section className="unique-student-card__container">
          <div className="chosen-student-info--container">
            <div className="chosen-student-heading">
              <span className="heding-student--name">{student?.name}</span>
              <span className="heding-student--institution">
                {student?.institution_id}
              </span>
            </div>
            <div className="chosen-student--info">
              <div className="chosen-student--history">
                <h1 className="history--heading">Histórico</h1>
                <div className="history--content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Eu sem integer vitae justo eget magna fermentum. Feugiat sed
                  lectus vestibulum mattis. Lectus mauris ultrices eros in
                  cursus turpis. In aliquam sem fringilla ut morbi. Lorem ipsum
                  dolor sit amet consectetur adipiscing. Faucibus purus in massa
                  tempor nec feugiat nisl pretium. Montes nascetur ridiculus mus
                  mauris vitae ultricies leo integer. Laoreet suspendisse
                  interdum consectetur libero id faucibus. Nec nam aliquam sem
                  et tortor. Ultrices mi tempus imperdiet nulla malesuada
                  pellentesque elit. Urna neque viverra justo nec ultrices dui
                  sapien eget mi. Nam aliquam sem et tortor consequat id porta
                  nibh venenatis. Lectus vestibulum mattis ullamcorper velit sed
                  ullamcorper morbi. Ornare quam viverra orci sagittis eu.
                  Vivamus at augue eget arcu dictum varius duis at. Lacus
                  vestibulum sed arcu non odio euismod lacinia. Faucibus in
                  ornare quam viverra orci sagittis eu. Sed odio morbi quis
                  commodo odio aenean sed adipiscing diam. Sapien nec sagittis
                  aliquam malesuada bibendum arcu vitae elementum. Duis at
                  tellus at urna. Congue mauris rhoncus aenean vel elit
                  scelerisque mauris pellentesque. Vulputate ut pharetra sit
                  amet. Felis donec et odio pellentesque diam volutpat commodo
                  sed. Vitae tortor condimentum lacinia quis vel eros donec ac
                  odio. Mi eget mauris pharetra et ultrices. Elit ullamcorper
                  dignissim cras tincidunt. Gravida cum sociis natoque penatibus
                  et. Tortor condimentum lacinia quis vel eros donec ac. Hac
                  habitasse platea dictumst vestibulum rhoncus est pellentesque.
                  Aliquam id diam maecenas ultricies mi eget mauris. Eu augue ut
                  lectus arcu. Diam donec adipiscing tristique risus.
                  Pellentesque habitant morbi tristique senectus et. Tempor orci
                  dapibus ultrices in iaculis nunc sed augue. Quis blandit
                  turpis cursus in hac. In fermentum et sollicitudin ac orci.
                  Quam viverra orci sagittis eu volutpat odio facilisis mauris
                  sit. Ut lectus arcu bibendum at varius vel pharetra vel
                  turpis. Gravida quis blandit turpis cursus in. Feugiat sed
                  lectus vestibulum mattis ullamcorper velit sed ullamcorper.
                  Nunc scelerisque viverra mauris in aliquam sem fringilla ut
                  morbi. Placerat vestibulum lectus mauris ultrices eros in
                  cursus. Id semper risus in hendrerit gravida rutrum quisque
                  non tellus. Morbi tincidunt ornare massa eget egestas purus
                  viverra accumsan in. In eu mi bibendum neque egestas congue
                  quisque egestas. Amet justo donec enim diam vulputate ut.
                  Tortor at risus viverra adipiscing at in. Suspendisse faucibus
                  interdum posuere lorem ipsum dolor sit amet. Scelerisque
                  varius morbi enim nunc faucibus a pellentesque sit amet.
                  Faucibus interdum posuere lorem ipsum dolor sit amet. Nulla
                  malesuada pellentesque elit eget gravida cum sociis. Eu
                  volutpat odio facilisis mauris sit amet massa vitae tortor. Ac
                  orci phasellus egestas tellus rutrum tellus pellentesque.
                  Tincidunt nunc pulvinar sapien et ligula ullamcorper. Arcu
                  odio ut sem nulla. At erat pellentesque adipiscing commodo
                  elit at imperdiet. Dictumst vestibulum rhoncus est
                  pellentesque. Maecenas volutpat blandit aliquam etiam. Justo
                  nec ultrices dui sapien eget mi. Sem et tortor consequat id.
                  Est sit amet facilisis magna etiam tempor. In hendrerit
                  gravida rutrum quisque non. Nibh ipsum consequat nisl vel
                  pretium. Aliquet porttitor lacus luctus accumsan tortor
                  posuere ac. Massa massa ultricies mi quis hendrerit. Est
                  pellentesque elit ullamcorper dignissim cras tincidunt
                  lobortis. Aliquam ultrices sagittis orci a scelerisque purus
                  semper eget duis. Amet commodo nulla facilisi nullam vehicula
                  ipsum a arcu cursus. Luctus accumsan tortor posuere ac ut
                  consequat semper viverra. Aliquam malesuada bibendum arcu
                  vitae elementum. At risus viverra adipiscing at in tellus
                  integer.
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
              <button onClick={handleOpenModal} className="student-schedule--button">
                AGENDAR CONSULTA
              </button>
              <button onClick={handleStudentModal} className="student-schedule--button">
                ALTERAR INFORMAÇÕES
              </button>
            </div>
          </div>
        </section>
      </main>
      {isModalOpen?<AppointmentModal closeModal={handleCloseModal}/>:""}
      {isStudentModalOpen?<StudentModal type="EDIT" studentInfo={student} closeModal={handleStudentModal}/>:""}
    </>
  );
};

export default Student;
