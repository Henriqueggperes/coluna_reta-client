import "./style.css";
import loading from "./../../assets/icons/loading-gif.gif";

const LoadingModal = () => {
  return (
    <section className="loading-modal--container">
      <div className="loading-modal--card">
        <div className="loading-modal-heading--container">
         <h1 className="loading-modal--heading">Buscando informações...</h1>
        </div>
        <div className="loading-modal-gif--container">
          <img className="loading--gif" src={loading}></img>
        </div>
      <div className="loading-modal-footer--container">
         <footer className="loading-modal--footer">Por favor aguarde </footer>
        </div>
      </div>
    </section>
  );
};

export default LoadingModal;
