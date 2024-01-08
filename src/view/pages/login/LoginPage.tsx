import { Card } from "@mantine/core";
import image from "./../../../assets/images/login_background.jpg";
import LupaPasswordForm from "./components/LupaPasswordForm";
import BuatAkunForm from "./components/BuatAkunForm";
import useLoginPageStore from "../../../stores/pages/useLoginPageStore";
import { useShallow } from "zustand/react/shallow";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  const formToggle = useLoginPageStore(useShallow((state) => state.currentForm));

  return (
    <div className="relative h-screen flex items-center justify-end">
      <img className="absolute w-full h-full" src={image} />
      <Card miw="400px" shadow="md" py="md" px="xl" mr="xl" radius="md">
        {formToggle == "login" && <LoginForm />}
        {formToggle == "new" && <BuatAkunForm />}
        {formToggle == "forgot" && <LupaPasswordForm />}
      </Card>
    </div>
  );
}

export default LoginPage;
