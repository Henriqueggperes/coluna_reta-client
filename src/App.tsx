import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
    <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                closeButton={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
   </>
  );
}

export default App;

