import { Title } from "@mantine/core";
import usePersist from "../../../stores/usePersist";
import ProductCard from "../../components/ProductCard/ProductCard";

const WishlistPage = () => {
  const store = usePersist((state) => state.WishlistStore);

  return (
    <div className="flex flex-col gap-2">
      <Title order={3}>Wishlist</Title>
      <div className="grid grid-flow-row grid-cols-5 -mx-2">
        {store.wishlist.map((p) => (
          <ProductCard.ById key={p.productId} productId={p.productId} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
