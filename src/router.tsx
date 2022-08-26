import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./types/routes";
import { LoginPage } from "./pages/LoginPage";
import Backoficce from "./pages/Backoficce";
import Student from "./components/Student";
import User from "./components/User";

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<LoginPage />} />
      <Route path={RoutePath.BACKOFFICE} element={<Backoficce/>} />
      <Route path={RoutePath.STUDENT} element={<Student/>} />
      <Route path={RoutePath.USER} element={<User/>}/>
    </Routes>
  );
};

export default Router;
