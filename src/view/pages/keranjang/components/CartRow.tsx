import { Checkbox, Divider, Image, Space, Title } from "@mantine/core";
import CartProductModel from "../../../../models/CartProductModel";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import UpdateNote from "./UpdateNote.tsx";
import useConfirmationModal from "../../../../hooks/useConfirmationModal.ts";
import useCartStore from "../../../../stores/app/useCartStore.ts";
import useKeranjangPageStore from "../../../../stores/pages/useKeranjangPageStore.ts";

const CartRow = ({ data }: { data: CartProductModel }) => {
  const { clear } = useCartStore.getState().actions!;
  const { refresh } = useKeranjangPageStore.getState().pageActions!;
  const confirmationModal = useConfirmationModal();

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center">
          <div className="w-8">
            <Checkbox />
          </div>
          <div className="flex w-full">
            <Link to={`/barang/${data.product.id}`} className="border rounded overflow-hidden border-gray-100 shrink-0">
              <Image w={80} h={70} fit="contain" src={data.product.thumbnail} />
            </Link>
            <Space w={10} />
            <div className="flex flex-col h-full">
              <Title order={4} className="font-normal">
                {data.product.title}
              </Title>
              <Title order={4} className="font-semibold">
                ${Math.round(data.product.price - data.product.price * (data.product.discountPercentage / 100))}
                <span className="font-normal text-sm text-gray-400">
                  <IoClose className="inline" />
                  {data.cart.count}
                </span>
              </Title>
            </div>
            <div
              onClick={() => {
                confirmationModal.actions.open({
                  body: (
                    <span>
                      Hapus <span className="font-semibold">{data.product.title}</span> dari keranjang?
                    </span>
                  ),
                  onAnswer: async (value) => {
                    if (value) {
                      clear!([data.cart.id]);
                      await refresh!();
                    }
                  },
                });
              }}
              className="relative h-min w-[20px] text-xl ml-auto mt-1 text-gray-400 cursor-pointer hover:text-red-600 "
            >
              <AiOutlineDelete className="absolute top-0 " />
              <AiFillDelete className="absolute top-0 opacity-0 hover:opacity-100" />
            </div>
          </div>
        </div>
        <UpdateNote product={data.product} />
      </div>
      <Divider opacity="0.4" />
    </>
  );
};

export default CartRow;
