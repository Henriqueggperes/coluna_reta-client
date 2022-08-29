import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { institutionObj, userObj, addressType } from "../../types/types";
import Header from "../Header";
import loginService from "../../services/authService";
import institutionService from "../../services/institutionService";
import InstitutionModal from "../InstitutionModal";

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
  const id = Number(params.id);

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
    const response = await institutionService.getInstitutionById(id);
    setInstitution(response.data);
  };

  return (
    <>
      <main className="unique-user-main--container">
        <Header loggedUser={userLogged} />
        <section className="unique-user-card--container">
          <div className="unique-user--card">
            <div className="user-card--heading">
              <span className="user-card-name user-card-heading">
                {institution.name}
              </span>
              <span className="user-card-role user-card-heading">
                {institution.phone_number}
              </span>
            </div>
            <section className="user-card-info--separation">
              <div className="user-card-info--container">
                <div className="user-card-id--container unique-info">
                  <label htmlFor="" className="unique-user-card--label">
                    ID
                  </label>
                  <span className="unique-user-card--info">{institution.id}</span>
                </div>

                <div className="user-card-updtdat--container unique-info">
                  <label htmlFor="" className="unique-user-card--label">
                    Adicionado em
                  </label>
                  <span className="unique-user-card--info">
                    {institution.created_at}
                  </span>
                </div>

                <div className="user-card-crtdat--container unique-info">
                  <label htmlFor="" className="unique-user-card--label">
                    Atualizado em
                  </label>
                  <span className="unique-user-card--info">
                    {institution.updated_at}
                  </span>
                </div>
              </div>
              <div className="user-card-insts--container">
                <h1 className="unique-user-card--label">Instituições</h1>
                <ul className="user-institutions-container">
                  {institution.address?.map((item: addressType) => (
                    <li className="user-institution--li">{item.street}</li>
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
      {modalIsOpen ? (
        <InstitutionModal closeModal={handleModal} type="EDIT" instInfo={institution} />
      ) : (
        ""
      )}
    </>
  );
};

export default Institution;
