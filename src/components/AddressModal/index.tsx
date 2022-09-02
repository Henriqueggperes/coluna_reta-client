import { useState } from "react";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import { addressType, modalProps } from "../../types/types";
import Modal from "react-modal";
import addressService from "../../services/addressService";
import "./style.css";

const ModalAddress = ({
  isOpen,
  closeModal,
  type,
  title,
  btnName,
}: modalProps) => {
  const [createNewAddress, setCreateNewAddress] = useState<addressType>({
    city: "",
    complement: "",
    neighborhood: "",
    number: "",
    state: "",
    street: "",
    zip_code: "",
  });

  const handleChangesValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateNewAddress({
      ...createNewAddress,
      [event.target.name]: event.target.value,
    });
  };

  const newAddress = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await addressService.postAddress(createNewAddress);

    if (response.status == 201) {
      closeModal();
      toast.success("Instituição adicionada com sucesso!");
    } else {
      toast.error(response.data.message[0]);
      closeModal();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="overlay-react-modal"
        className="content-react-modal"
      >
        <button
          type="button"
          onClick={closeModal}
          className="close-modal-button"
        >
          <BiX />
        </button>

        <h2 className="modal-title">{title}</h2>
        <form onSubmit={newAddress} className="form-modal">
          <label className="label-modal" htmlFor="street">
            Rua
          </label>
          <input
            type="text"
            name="street"
            id="street"
            placeholder="Nome da rua"
            onChange={handleChangesValues}
          />
          
          <label className="label-modal" htmlFor="number">
            Numero
          </label>
          <input
            type="text"
            name="number"
            id="number"
            placeholder="Numero do predio"
            onChange={handleChangesValues}
          />
          
          <label className="label-modal" htmlFor="complement">
            Complemento
          </label>
          <input
            type="text"
            name="complement"
            id="complement"
            placeholder="Complemento"
            onChange={handleChangesValues}
          />
          
          <label className="label-modal" htmlFor="zip_code">
            CEP
          </label>
          <input
            type="text"
            name="zip_code"
            id="zip_code"
            placeholder="CEP"
            onChange={handleChangesValues}
          />
                  
          <label className="label-modal" htmlFor="neighborhood">
            Bairro
          </label>
          <input
            type="text"
            name="neighborhood"
            id="neighborhood"
            placeholder="Bairro"
            onChange={handleChangesValues}
          />
          
          <label className="label-modal" htmlFor="state">
            UF
          </label>
          <input
            type="text"
            name="state"
            id="state"
            placeholder="Estado - UF"
            onChange={handleChangesValues}
          />
          
          <label className="label-modal" htmlFor="city">
            Cidade
          </label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Cidade"
            onChange={handleChangesValues}
          />

          <button className="btn-modal" type="submit">
            {btnName}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalAddress;
