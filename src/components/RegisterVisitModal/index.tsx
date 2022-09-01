import "./style.css";
import cam from "./../../assets/img/cam.png";
import { useMemo, useState } from "react";
import close_icon from "./../../assets/icons/close_icon.svg";
import { RiFolderUploadLine } from "react-icons/ri";

const RegisterVisitModal = (props: { closeModal: Function }) => {
  const [thumbnail1, setThumbnail1] = useState<FileList | null>(null);
  const preview1 = useMemo(() => {
    return thumbnail1 ? URL.createObjectURL(thumbnail1[0]) : null;
  }, [thumbnail1]);

  const [thumbnail2, setThumbnail2] = useState<FileList | null>(null);
  const preview2 = useMemo(() => {
    return thumbnail2 ? URL.createObjectURL(thumbnail2[0]) : null;
  }, [thumbnail2]);

  return (
    <section className="register-visit-modal--container">
      <form className="register-visit-modal--form">
        <div className="register-visit-modal-heading--container">
          <h1 className="register-visit--heading">REGISTRO VISITA</h1>
          <img
            onClick={(event) => props.closeModal()}
            className="visit-modal-form-close--icon"
            src={close_icon}
            alt="Icone com um xis para fechar a aba de adicionar usuário"
          />
        </div>
        <div className="register-visit-images-forms--container">
          <div className="register-visit-image--form">
            <label
              className={`cam ${thumbnail1 ? "has-thumbnail" : ""}`}
              style={{ backgroundImage: `url(${preview1})` }}
            >
              <img src={cam} alt="Imagem de um desenho de uma câmera" />
              <input
                onChange={(event) => setThumbnail1(event.target.files)}
                className="register-image--input"
                type="file"
              />
            </label>
            <div className="send-image-buton--container">
              <RiFolderUploadLine className="send-image--button" />
              <span className="send-image--span">Enviar imagem</span>
            </div>
          </div>

          <div className="register-visit-image--form">
            <label
              className={`cam ${thumbnail2 ? "has-thumbnail" : ""}`}
              style={{ backgroundImage: `url(${preview2})` }}
            >
              <img src={cam} alt="Imagem de um desenho de uma câmera" />
              <input
                onChange={(event) => setThumbnail2(event.target.files)}
                className="register-image--input"
                type="file"
              />
            </label>
            <div className="send-image-buton--container">
              <RiFolderUploadLine className="send-image--button" />
              <span className="send-image--span">Enviar imagem</span>
            </div>
          </div>
        </div>
        <section className="register-visit-from-inputs--container">
          <div className="register-visit-form--inputs">
            <div className="register-visit-input--container">
              <input required name="fowarding" className="register-visit--input" type="text"/>
              <label className="register-visit-input--label">Encaminhamento</label>
            </div>
            <div className="register-visit-input--container">
              <input required name="cobb_angle" className="register-visit--input" type="text"/>
              <label className="register-visit-input--label">Ângulo de Cobb</label>
            </div>
            <div className="register-visit-input--container">
              <input required name="return_date" className="register-visit--input" type="text"/>
              <label className="register-visit-input--label">Data de retorno (Ex: 14/08/2022)</label>
            </div>
          </div>
        </section>
        <section className="register-visit-form-button--container">
           <button className="register-visit-send--button">Confirmar visita</button>
        </section>
      </form>
    </section>
  );
};

export default RegisterVisitModal;
