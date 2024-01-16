import { Checkbox, Divider, Image, NumberInput, Space, Title } from "@mantine/core";
import CartProductModel from "../../../../models/CartProductModel";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import UpdateNote from "./UpdateNote.tsx";
import useApp from "../../../../stores/useApp.ts";
import { IoRemove } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

const CartRow = ({ data }: { data: CartProductModel }) => {
  const modalStore = useApp.getState().ConfirmationModalStore;
  const { check, clear, addCount, countOnChange } = useApp.getState().pageKeranjangStore.actions;

  const onDelete = () => {
    modalStore.actions.open({
      body: (
        <span>
          Hapus <span className="font-semibold">{data.product.title}</span> dari keranjang?
        </span>
      ),
      onAnswer: async (value) => {
        if (value) clear(data.cart.id);
      },
    });
  };

  const onCountChange = (e: string | number) => countOnChange(data.cart.id, +e);

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center">
          <div className="w-8">
            <Checkbox checked={data.cart.checked} onChange={() => check(data.cart.id)} />
          </div>
          <div className="flex items-end w-full h-full">
            <Link to={`/barang/${data.product.id}`} className="border rounded overflow-hidden border-gray-100 shrink-0">
              <Image w={80} h={70} fit="contain" src={data.product.thumbnail} />
            </Link>
            <Space w={10} />
            <div className="h-full">
              <Title order={4} className="font-normal">
                {data.product.title}
              </Title>
              <div className="flex items-end gap-1">
                <Title order={4} className="font-semibold">
                  ${Math.round(data.product.price - data.product.price * (data.product.discountPercentage / 100))}
                </Title>
                <Title td="line-through" fw="normal" order={5} className="text-gray-400">
                  ${data.product.price}
                </Title>
              </div>
            </div>
            <div className="h-min flex items-center justify-between ml-auto mt-1">
              <div className="">
                <NumberInput
                  value={data.cart.count}
                  w={85}
                  maxLength={3}
                  leftSectionWidth={25}
                  rightSectionWidth={25}
                  leftSection={<IoRemove className="cursor-pointer hover:text-pink-500" onClick={() => addCount(data.cart.id, -1)} />}
                  rightSection={<IoAdd className="cursor-pointer hover:text-pink-500" onClick={() => addCount(data.cart.id, 1)} />}
                  onChange={onCountChange}
                  classNames={{
                    input: "text-center text-sm font-semibold text-gray-600",
                  }}
                />
              </div>
              <Divider size="sm" mx="md" orientation="vertical" />
              <div onClick={onDelete} className="relative h-min w-[20px] text-[1.3rem] cursor-pointer text-gray-400 hover:text-red-600 ">
                <AiOutlineDelete className="top-0 " />
                <AiFillDelete className="absolute top-0 opacity-0 hover:opacity-100" />
              </div>
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
