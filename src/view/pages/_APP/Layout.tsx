import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import { useEffect } from "react";
import useAuthStore from "../../../stores/app/useAuthStore";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";

const Layout = () => {
  const navigate = useNavigate();

  // useLayoutEffect(() => {
  //   if (!useAuthStore.getState().actions.isAuthenticated()) {
  //     navigate("/masuk");
  //     return;
  //   }
  // }, []);

  useEffect(() => {
    if (!useAuthStore.getState().actions.isAuthenticated()) {
      navigate("/masuk");
      return;
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center">
      <AppBar />
      <div className="flex flex-col max-w-[1200px] rounded w-[80%] bg-white py-5 px-5 mt-6 mb-12">
        <Outlet />
      </div>
      <ConfirmationModal />
    </div>
  );
};

export default Layout;
