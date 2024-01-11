import { Checkbox, Space, Title } from "@mantine/core";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const CartHeader = () => {

  return (
    <div className="flex flex-col w-full">
      <Title order={4}>Keranjang</Title>
      <Space h={20} />
      <div className="flex justify-between">
        <Checkbox fw="bold" label="Pilih Semua" />
        <div
          className={`transition-all duration-[450ms] ease-in-out flex items-center max-w-8  overflow-hidden select-none cursor-pointer rounded-full hover:max-w-full hover:bg-red-400 text-gray-600 hover:text-white`}
        >
          <MdOutlineRemoveShoppingCart className="shrink-0 text-xl m-1.5 ml-3" />
          <span className="shrink-0 text-sm pr-3 font-semibold text-white ">Bersihkan keranjang</span>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
