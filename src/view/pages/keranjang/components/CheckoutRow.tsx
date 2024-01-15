import { Text } from "@mantine/core";
import CartProductModel from "../../../../models/CartProductModel";

const CheckoutRow = ({ data, showDivider }: { data: CartProductModel; showDivider: boolean }) => {
  const priceAfterDiscount = Math.round(data.product.price - data.product.price * (data.product.discountPercentage / 100));
  const totalPrice = priceAfterDiscount * data.cart.count;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div>
          <Text className="text-gray-500">{data.product.title}</Text>
          <Text size="sm" className="text-gray-400">
            Total: {data.cart.count}
          </Text>
        </div>
        <span className="text-lg font-semibold text-gray-400">${totalPrice}</span>
      </div>

      {showDivider && <div className="w-full h-[1px] bg-gray-200 my-3" />}
    </div>
  );
};

export default CheckoutRow;
