import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./types/routes";
import { LoginPage } from "./pages/LoginPage";
import Backoficce from "./pages/Backoficce";
import Student from "./components/Student";

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<LoginPage />} />
      <Route path={RoutePath.BACKOFICCE} element={<Backoficce/>} />
      <Route path={RoutePath.STUDENT} element={<Student/>} />
    </Routes>
  );
};

export default Router;
