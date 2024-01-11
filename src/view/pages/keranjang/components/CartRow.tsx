import { Checkbox, Divider, Image, Space, Title } from "@mantine/core";
import CartProductModel from "../../../../models/CartProductModel";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import UpdateNote from "./UpdateNote.tsx";

const CartRow = ({ data }: { data: CartProductModel }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center w-full">
          <div className="w-8">
            <Checkbox />
          </div>
          <div className="flex">
            <Link to={`/barang/${data.product.id}`}>
              <div className="border rounded-lg overflow-hidden border-gray-100">
                <Image w={80} h={70} fit="fill" src={data.product.thumbnail} />
              </div>
            </Link>
            <Space w={10} />
            <div className="h-full">
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
          </div>
        </div>
        <UpdateNote product={data.product} />
      </div>
      <Divider 
      opacity="0.4" />
    </>
  );
};

export default CartRow;
