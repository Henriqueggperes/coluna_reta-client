import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./types/routes";
import { LoginPage } from "./pages/LoginPage";
import Backoficce from "./pages/Backoficce";
import Student from "./components/Student";
import User from "./components/User";
import Institution from "./components/Institution";
import RecoverPassword from "./pages/RecoverPassword";

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<LoginPage />} />
      <Route path='/backoffice' element={<Backoficce/>} />
      <Route path={RoutePath.STUDENT} element={<Student/>} />
      <Route path={RoutePath.USER} element={<User/>}/>
      <Route path={RoutePath.INSTITUTION} element={<Institution/>}/>
      <Route path={RoutePath.RECOVER} element={<RecoverPassword/>}/>
    </Routes>
  );
};

export default Router;
