import { Badge } from "@mantine/core";
import { BsMinecart } from "react-icons/bs";
import { Link } from "react-router-dom";
import usePersist from "../../../../stores/usePersist";

const CartIcon = () => {
  const { carts } = usePersist().CartStore;

  return (
    <Link to={"/keranjang"} className="relative">
      {carts.length > 0 && (
        <Badge circle size="sm" fw="bold" className="bg-pink-400 absolute right-[-10px] top-[-10px]">
          {carts.length}
        </Badge>
      )}
      <BsMinecart className="text-2xl text-pink-600" />
    </Link>
  );
};

export default CartIcon;
