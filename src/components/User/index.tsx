import "./style.css";
import Header from "../Header";
import loginService from "../../services/authService";
import { useEffect, useState } from "react";
import { institutionObj, userObj } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
import "./style.css";
import institutionService from "../../services/institutionService";
import UsersModal from "../UsersModal";
import { toast } from "react-toastify";
import LoadingModal from "../LoadingModal";

const User = () => {

const jwt = localStorage.getItem('jwt')

const navigate = useNavigate()

  useEffect(() => {
    if (!jwt) {
      toast.error("Realize o login antes de acessar o backoffice");
      navigate("/");
    }
  });
  const params = useParams();

  const id = Number(params.id);

  const [isInfoLoading,setIsInfoLoading] = useState(false);

  const [isModalOpen,setIsModalOpen] =useState<boolean>(false)

  const [user, setUser] = useState<userObj>({
    name: "",
    role: "",
    institution_id: [],
    email: "",
    institutions: [],
    recoverPasswordToken: '',
  });

  const handleModal = ()=>{
    setIsModalOpen(!isModalOpen)
  }


  const getUser = async () => {
    setIsInfoLoading(true)
    const response = await userService.getUserById(id);
    if(response){
      setIsInfoLoading(false);
    }
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <main className="unique-user-main--container">
        <Header/>
        <section className="unique-user-card--container">
          <div className="unique-user--card">
            <div className="user-card--heading">
              <span className="user-card-name user-card-heading">
                {user.name}
              </span>
              <span className="user-card-role user-card-heading">
                {user.role}
              </span>
            </div>
            <section className="user-card-info--separation">
              <div className="user-card-info--container">
                <div className="user-card-id--container unique-info">
                  <label htmlFor="" className="unique-user-card--label">
                    ID
                  </label>
                  <span className="unique-user-card--info">
                    {user.id}
                    </span>
                </div>

                <div className="user-card-email--container unique-info">
                  <label htmlFor="" className="unique-user-card--label">
                    E-mail
                  </label>
                  <span className="unique-user-card--info">
                    {user.email}
                    </span>
                </div>

                <div className="user-card-updtdat--container unique-info">
                  <label htmlFor="" className="unique-user-card--label">
                    Adicionado em
                  </label>
                  <span className="unique-user-card--info">
                    {user.created_at}
                  </span>
                </div>

                <div className="user-card-crtdat--container unique-info">
                  <label htmlFor="" className="unique-user-card--label">
                    Atualizado em
                  </label>
                  <span className="unique-user-card--info">
                    {user.updated_at}
                  </span>
                </div>
                
              </div>
              <div className="user-card-insts--container">
                <h1 className="unique-user-card--label">Instituições</h1>
                <ul className="user-institutions-container">
                  {user.institutions?.map((item:any) => (
                    <li className="user-institution--li">{item.name}</li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="user-card-edit-button--container">
              <button onClick={handleModal} className="user-card-edit--button">
                ALTERAR INFORMAÇÕES
              </button>
            </div>
          </div>
        </section>
      </main>
     {isModalOpen? <UsersModal closeModal={handleModal} type='EDIT' userInfo={user}/>
     :
     ""}
     {isInfoLoading? <LoadingModal/> : ''}
    </>
  );
};

export default User;
