import { Card, Divider, Space, Button, Loader } from "@mantine/core";
import CheckoutRow from "./CheckoutRow";
import { TiShoppingCart } from "react-icons/ti";
import useApp from "../../../../stores/useApp";
import { useNavigate } from "react-router-dom";

const CartAction = () => {
  const store = useApp((state) => state.pageKeranjangStore);
  const navigate = useNavigate();

  const selectedCartProducts = store.actions.getSelectedProducts();

  const totalPrice = selectedCartProducts
    .map((data) => {
      const priceAfterDiscount = Math.round(data.product.price - data.product.price * (data.product.discountPercentage / 100));

      return Math.round(priceAfterDiscount * data.cart.count);
    })
    .reduce((p, c) => p + c, 0);

  const enableBuy = selectedCartProducts.length > 0;

  const buy = async () => {
    if (store.loading) return;

    await store.actions.buy();
    navigate("/checkout");
  };

  return (
    <Card p="sm" className="sticky top-28 flex flex-col w-[40%] h-min" withBorder>
      <Card.Section className="bg-pink-500" p="md">
        <span className="flex items-center gap-1 font-semibold text-white">
          <TiShoppingCart className="text-2xl" />
          CHECKOUT
        </span>
      </Card.Section>
      {enableBuy ? (
        <Card.Section>
          <div className="flex flex-col pl-6 pr-4 max-h-[400px] overflow-y-auto">
            <Space h={10} />
            {selectedCartProducts.map((c, i) => (
              <CheckoutRow key={i} data={c} showDivider={i != selectedCartProducts.length - 1} />
            ))}
            <Space h={10} />
          </div>
        </Card.Section>
      ) : (
        <span className="py-4 text-gray-300">-</span>
      )}
      <Card.Section>
        <Divider />
      </Card.Section>
      <div className="flex flex-col pt-2 pb-0.5">
        <div className="text-xl text-gray-600 ">
          Total price <span className="font-bold text-gray-800">${totalPrice}</span>
        </div>
        <div className="text-md text-gray-600 ">
          Total barang <span className=" font-semibold text-gray-500">{selectedCartProducts.length}</span>
        </div>
        <Space h={10} />
        <Button disabled={!enableBuy} size="md" color="cpink" fullWidth onClick={buy}>
          {store.loading ? <Loader color="white" size="sm" /> : "BELI"}
        </Button>
      </div>
    </Card>
  );
};

export default CartAction;
