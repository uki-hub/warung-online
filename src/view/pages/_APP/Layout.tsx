import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import { useLayoutEffect } from "react";
import useAuthStore from "../../../stores/app/useAuthStore";

const Layout = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!useAuthStore.getState().actions.isAuthenticated()) {
      navigate("/masuk");
      return;
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <AppBar />
      <div className="flex flex-col max-w-[1200px] rounded w-[80%] bg-white py-5 px-5 mt-6 mb-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
