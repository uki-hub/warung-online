import { Image, Title } from "@mantine/core";
import { CartProductModel } from "../../../../models/CartProductModel";

const CartRow = ({ data }: { data: CartProductModel }) => {
  return (
    <div className="flex ">
      <Image src={data.product.thumbnail} />
      <Title order={4}>{data.product.title}</Title>
    </div>
  );
};

export default CartRow;
