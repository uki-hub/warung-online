import { Divider, Loader, Space } from "@mantine/core";
import CartRow from "./components/CartRow";
import { useEffect } from "react";
import CartHeader from "./components/CartHeader";
import CartAction from "./components/CartAction";
import useApp from "../../../stores/useApp";

const KeranjangPage = () => {
  const store = useApp((state) => state.pageKeranjangStore);

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
        <div className="flex flex-col gap-5">
          {store.cartProducts.map((c, i) => (
            <CartRow key={i} data={c} />
          ))}
        </div>
      </div>
      <CartAction />
    </div>
  );
};

export default KeranjangPage;
