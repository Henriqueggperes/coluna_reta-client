import cr_logo from "./../../assets/icons/cr_logo.png";
import confirm_icon from "./../../assets/icons/confirm_icon.svg";
import "./style.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
import { registerPassword } from "../../types/types";
import { toast } from "react-toastify";
import { IoInformationCircleOutline } from "react-icons/io5";

const RecoverPassword = () => {
  const params = useParams();
  
  const navigate = useNavigate()

  const [regPassword, setRegPassword] = useState<registerPassword>({
    passwordHash: "",
    confirmPassword: "",
    recoverPasswordToken: params.token,
  });

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegPassword({
      ...regPassword,
      [event.target.name]: event.target.value,
    });
    console.log(regPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await userService.registerPassword(regPassword);
    if (response.data.statusCode != 204) {
      toast.error(response.data.message,{
        className:"toast-error--message"
      });
    } else {
      toast.success("Senha registrada com sucesso!");
      navigate('/')
    }
  };

  return (
    <main className="register-password--section">
      <section className="register-password-logo--section">
        <img
          className="register-cr--logo"
          src={cr_logo}
          alt="Logo roxo do site Coluna Reta"
        />
        <span className="register-cr-logo--span">Backoffice</span>
      </section>

      <section className="register-password-image-form--section">
        <div className="register-password-image-form--container">
          <div className="register-password-form--container register--container">
            <form onSubmit={handleSubmit} className="register-password--form">
              <h1 className="register-password--heading">
                {" "}
                REGISTRE SUA SENHA
              </h1>
              <div className="register-password-form-inputs--container">
                <div className="register-form-label-input--container">
                  <input
                    type="password"
                    name="passwordHash"
                    onChange={handleChanges}
                    className="register-password-form--input"
                    required
                  />
                  <label className="register-password-form--label">
                    Senha
                    <IoInformationCircleOutline className="password-label-info--icon" />
                    <div className="password-regex--info">
                      A senha deve ter no mínimo 8 caracteres, um número, uma
                      letra maiúscula, uma letra minúscula e um caracter
                      especial. Ex: Y7@kksb4
                    </div>
                  </label>
                </div>

                <div className="register-form-label-input--container">
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChanges}
                    className="register-password-form--input"
                    required
                  />
                  <label className="register-password-form--label">
                    Confirme sua senha
                  </label>
                </div>
              </div>
              <div className="register-password-button--container">
                <button className="register-password--button">ENVIAR</button>
              </div>
            </form>
          </div>
          <div className="register--divider"></div>
          <div className="register-password-image--container register--container">
            <img
              className="register-confirm--icon"
              src={confirm_icon}
              alt="Imagem com cores de paleta roxa de uma mulher segurando um celular confirmando sua senha"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecoverPassword;
