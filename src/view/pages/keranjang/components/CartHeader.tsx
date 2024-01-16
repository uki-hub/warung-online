import { Checkbox, Space, Title } from "@mantine/core";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FiXSquare } from "react-icons/fi";

import useApp from "../../../../stores/useApp";

const CartHeader = () => {
  const store = useApp((state) => state.pageKeranjangStore);
  const modalStore = useApp.getState().ConfirmationModalStore;

  const { isAllChecked, hasChecked, hasProducts, checkAll, clearAll, clearSelected } = store.actions;

  return (
    <div className="flex flex-col w-full">
      <Title order={3}>Keranjang</Title>
      <Space h={20} />
      <div className="flex items-center">
        <Checkbox disabled={!hasProducts()} fw="bold" label="Pilih Semua" checked={isAllChecked()} onChange={checkAll} />
        <Space w={20} />
        <div
          onClick={clearSelected}
          className={`flex gap-1 items-center  ${hasChecked() ? "cursor-pointer text-pink-500 hover:text-pink-800" : "text-gray-300"} `}
        >
          <FiXSquare className="text-[1.4rem]" />
          <span className="text-sm font-semibold ">Hapus terpilih</span>
        </div>
        <div
          className={`transition-all duration-[450ms] ease-in-out ml-auto flex items-center max-w-8 overflow-hidden select-none rounded-full ${
            hasProducts() ? "cursor-pointer hover:max-w-full hover:bg-red-400 text-gray-600 hover:text-white" : "text-gray-300"
          }`}
        >
          <MdOutlineRemoveShoppingCart className="shrink-0 text-xl m-1.5 ml-3" />
          <span
            className="shrink-0 text-sm pr-3 font-semibold text-white "
            onClick={() => {
              modalStore.actions.open({
                body: <span>Hapus semua produk dari keranjang?</span>,
                onAnswer: async (value) => {
                  if (value) clearAll();
                },
              });
            }}
          >
            Bersihkan keranjang
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
