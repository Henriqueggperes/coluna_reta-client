import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { institutionObj, userObj, addressType } from "../../types/types";
import Header from "../Header";
import loginService from "../../services/authService";
import institutionService from "../../services/institutionService";
import InstitutionModal from "../InstitutionModal";
import "./style.css";

const Institution = () => {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt) {
      toast.error("Realize o login antes de acessar o backoffice");
      navigate("/");
    } else {
      getLoggedUser();
      getInstitution();
    }
  }, []);

  const params = useParams();

  const [userLogged, setUserLogged] = useState<userObj>({
    name: "",
    role: "",
    institution_id: [],
    email: "",
    institutions: [
      {
        name: "",
      },
    ],
    recoverPasswordToken: "",
    created_at: "",
    updated_at: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [institution, setInstitution] = useState<institutionObj>({
    id: 0,
    name: "",
    phone_number: "",
    address_id: 0,
    created_at: "",
    updated_at: "",
    deleted: false,
  });

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const getLoggedUser = async () => {
    const response = await loginService.loggedUser();
    setUserLogged(response.data.user);
  };

  const getInstitution = async () => {
    const id = Number(params.id);
    const response = await institutionService.getInstitutionById(id);
    setInstitution(response.data);
  };

  return (
    <>
      <main className="unique--main--container">
        <Header loggedUser={userLogged} />
        <section className="unique-inst-card--container">
          <div className="unique-inst--card">
            <div className="inst-card--heading">
              <span className="inst-card-name inst-card-heading">
                Instituiçãssso: {institution.name}
              </span>
            </div>

            <section className="inst-card-info--separation">
              <div className="inst-card-info--container">
                
                <div className="inst-card-id--container unique-info">
                  
                  <label htmlFor="" className="unique-inst-card--label-ID">
                    ID
                  </label>
                  <span className="unique-inst-card--info">
                    {institution.id}
                  </span>
                  
                  <label htmlFor="" className="unique-inst-card--label">
                  Telefone:
                  </label>
                  <span className="inst-card-phone inst-card-heading">
                     {institution.phone_number}
                  </span>
                
                </div>

                <div className="inst-card-crtdat--container unique-info">
                  <label htmlFor="" className="unique-inst-card--label">
                    Adicionado em
                  </label>
                  <span className="unique-inst-card--info-crt">
                    {institution.created_at}
                  </span>
                  
                  <label htmlFor="" className="unique-inst-card--label">
                    Atualizado em
                  </label>
                  <span className="unique-inst-card--info">
                    {institution.updated_at}
                  </span>
                </div>

                {/* <div className="inst-card-crtdat--container unique-info">
                  <label htmlFor="" className="unique-inst-card--label">
                    Atualizado em
                  </label>
                  <span className="unique-inst-card--info">
                    {institution.updated_at}
                  </span>
                </div> */}
              </div>
              
              <div className="inst-card-insts--container">
                <h1 className="unique-inst-card--label">Endereço</h1>
                <ul className="inst-address-container">
                  {institution.address?.map((item: addressType) => (
                    <li className="inst-institution--li">{item.id}</li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="inst-card-edit-button--container">
              <button onClick={handleModal} className="inst-card-edit--button">
                ALTERAR INFORMAÇÕES
              </button>
            </div>
          </div>
        </section>
      </main>
      {modalIsOpen ? (
        <InstitutionModal
          closeModal={handleModal}
          type="EDIT"
          instInfo={institution}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Institution;
