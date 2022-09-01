import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  institutionObj,
  userObj,
  addressType,
  postInstitutionObj,
} from "../../types/types";
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
      getInstitution();
    }
  }, []);

  const params = useParams();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [institution, setInstitution] = useState<postInstitutionObj>({
    name: "",
    phone_number: "",
    state: "",
    city: "",
    zip_code: "",
  });

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };


  const getInstitution = async () => {
    const id = Number(params.id);
    const response = await institutionService.getInstitutionById(id);
    setInstitution(response.data);
    console.log(response.data);
  };

  return (
    <>
      <main className="unique--main--container">
        <Header/>
        <section className="unique-inst-card--container">
          <div className="unique-inst--card">
            <div className="inst-card--heading">
              <span className="inst-card-name inst-card-heading">
                Instituição: {institution.name}
              </span>
            </div>

            <section className="info-main-section">
              <div className="inst-card-info--container">
                <div className="inst-card-id--container unique-info">
                  <div className="info-main-card">
                    
                    <div className="info">
                      <label htmlFor="" className="unique-inst-card--label">
                        ID:
                      </label>
                      <span className="span-inst-card--info">
                        {institution.id}
                      </span>
                    </div>

                    <div className="info">
                      <label htmlFor="" className="unique-inst-card--label">
                        Telefone:
                      </label>
                      <span className="span-inst-card--info">
                        {institution.phone_number}
                      </span>
                    </div>

                    <div className="info">
                      <label htmlFor="" className="unique-inst-card--label">
                        CEP:
                      </label>
                      <span className="span-inst-card--info">
                        {institution.zip_code}
                      </span>
                    </div>

                    <div className="info">
                      <label htmlFor="" className="unique-inst-card--label">
                        Cidade:
                      </label>
                      <span className="span-inst-card--info">
                        {institution.city}
                      </span>
                    </div>

                    <div className="info">
                      <label htmlFor="" className="unique-inst-card--label">
                        Estado:
                      </label>
                      <span className="span-inst-card--info">
                        {institution.state}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="inst-space-create-update">
                  <div className="infos-space-create-update">
                    <label htmlFor="" className="unique-inst-card--label">
                      Adicionado em:
                    </label>
                    <span className="span-inst-card--info">
                      {institution.created_at}
                    </span>
                  </div>

                  <div className="infos-space-create-update">
                    <label htmlFor="" className="unique-inst-card--label">
                      Atualizado em:
                    </label>
                    <span className="span-inst-card--info">
                      {institution.updated_at}
                    </span>
                  </div>
                </div>
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
          handleModal={handleModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Institution;
