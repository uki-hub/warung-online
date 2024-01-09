import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import BerandaPage from "../beranda/BerandaPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BerandaPage />,
  },
  {
    path: "/masuk",
    element: <LoginPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router}  />;
};

export default Router;
