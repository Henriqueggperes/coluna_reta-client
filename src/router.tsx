import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./types/routes";
import { LoginPage } from "./pages/LoginPage";
import Backoficce from "./pages/Backoficce";
import Student from "./components/Student";
import User from "./components/User";
import Institution from "./components/Institution";

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<LoginPage />} />
      <Route path={RoutePath.BACKOFFICE} element={<Backoficce/>} />
      <Route path={RoutePath.STUDENT} element={<Student/>} />
      <Route path={RoutePath.USER} element={<User/>}/>
      <Route path={RoutePath.INSTITUTION} element={<Institution/>}/>
    </Routes>
  );
};

export default Router;
