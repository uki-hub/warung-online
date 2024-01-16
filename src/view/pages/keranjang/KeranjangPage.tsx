import { Anchor, Divider, Loader, Space } from "@mantine/core";
import CartRow from "./components/CartRow";
import { useEffect } from "react";
import CartHeader from "./components/CartHeader";
import CartAction from "./components/CartAction";
import useApp from "../../../stores/useApp";
import { useShallow } from "zustand/react/shallow";
import { Link } from "react-router-dom";

const KeranjangPage = () => {
  const store = useApp(useShallow((state) => state.pageKeranjangStore));

  useEffect(() => {
    const { load, clear } = useApp.getState().pageKeranjangStore.pageActions!;

    load!();

    return clear!;
  }, []);

  if (!store.loaded && store.loading) return <Loader />;

  return (
    <div className="flex gap-12 h-full">
      <div className="flex flex-col w-[60%]">
        <CartHeader />
        <Space h={5} />
        <Divider size="md" />
        <Space h={20} />
        {store.actions.hasProducts() ? (
          <div className="flex flex-col gap-5">
            {store.cartProducts.map((c, i) => (
              <CartRow key={i} data={c} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-lg text-gray-400">Tidak ada produk</span>
            <Link to={"/"}>
              <Anchor size="sm">Cari produk pilihan mu</Anchor>
            </Link>
          </div>
        )}
      </div>
      <CartAction />
    </div>
  );
};

export default KeranjangPage;
