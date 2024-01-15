import { Card } from "@mantine/core";
import image from "./../../../assets/images/login_background.jpg";
import LupaPasswordForm from "./components/LupaPasswordForm";
import BuatAkunForm from "./components/BuatAkunForm";
import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../../../stores/useApp";
import usePersist from "../../../stores/usePersist";

function LoginPage() {
  const navigate = useNavigate();
  const formToggle = useApp((state) => state.pageLoginStore.currentForm);

  useEffect(() => {
    if (usePersist.getState().auth_isAuthenticated()) navigate("/");
  }, [navigate]);

  return (
    <div className="relative h-screen flex items-center justify-end">
      <img className="absolute w-full h-full" src={image} />
      <Card miw="400px" shadow="md" py="md" px="xl" radius="md" className="mr-20">
        {formToggle == "login" && <LoginForm />}
        {formToggle == "new" && <BuatAkunForm />}
        {formToggle == "forgot" && <LupaPasswordForm />}
      </Card>
    </div>
  );
}

export default LoginPage;
