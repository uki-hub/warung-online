import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import BerandaPage from "../beranda/BerandaPage";
import BarangPage from "../barang/BarangPage";
import Layout from "./Layout";
import KeranjangPage from "../keranjang/KeranjangPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <BerandaPage />,
      },
      {
        path: "/barang/:id",
        element: <BarangPage />,
      },
      {
        path: "/keranjang",
        element: <KeranjangPage />,
      },
    ],
  },
  {
    path: "/masuk",
    element: <LoginPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
