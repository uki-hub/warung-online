import { Checkbox, Divider, Loader, Space, TextInput, Title } from "@mantine/core";
import CartRow from "./components/CartRow";
import useKeranjangPageStore from "../../../stores/pages/useKeranjangPageStore";
import { useEffect } from "react";

const KeranjangPage = () => {
  const state = useKeranjangPageStore();

  useEffect(() => {
    state.pageActions!.load!();
    
    return state.pageActions!.clear!();
  }, []);

  if (!state.loaded && state.loading) return <Loader />;

  return (
    <div className="flex gap-12">
      <div className="flex flex-col w-[60%]">
        <Title order={4}>Keranjang</Title>
        <Space h={20} />
        <div className="flex">
          <Checkbox fw="bold" label="Pilih Semua" />
        </div>
        <Space h={15} />
        <Divider />
        <Space h={20} />
        {state.cartProducts.map((c) => (
          <CartRow data={c} />
        ))}
      </div>
      <div className="sticky top-28 flex flex-col w-[40%] h-min border rounded-lg p-4">
        <Title order={5} className="text-gray-700">
          Checkout
        </Title>
      </div>
    </div>
  );
};

export default KeranjangPage;
