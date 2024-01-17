import { Badge, Divider, Space, Text, Title } from "@mantine/core";
import { GiRoundStar } from "react-icons/gi";
import ProductModel from "../../../../models/ProductModel";
import ProductAction from "./ProductAction";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import usePersist from "../../../../stores/usePersist";
import { useShallow } from "zustand/react/shallow";

const SideSection = ({ product }: { product: ProductModel }) => {
  const wishlistStore = usePersist(useShallow((state) => state.WishlistStore));

  const isWishlisted = wishlistStore.wishlist.findIndex((w) => w.productId == product.id) != -1;

  const onWish = () => {
    usePersist.getState().wishlist_wish({
      productId: product.id,
    });
  };

  return (
    <div className="flex flex-col w-[40%]">
      <div className="flex justify-between">
        <Title>{product.title}</Title>
        <div className="relative my-2 cursor-pointer flex-shrink-0 text-xl " onClick={onWish}>
          <BsHeart className="absolute text-gray-400 " />
          <BsHeartFill className={`transition-all ease-in absolute text-red-500 ${isWishlisted ? "scale-100" : "scale-0"}`} />
        </div>
      </div>
      <Space h={5} />
      <div className="flex gap-4">
        <div className="flex items-center gap-1.5">
          <GiRoundStar className="text-yellow-400" /> <span className="font-semibold text-sm text-gray-700">{product.rating}</span>
        </div>
        <Divider orientation="vertical" />
        <div>
          <span className="text-gray-500">Stok</span> <span className="font-semibold text-sm text-gray-700">{product.stock}</span>
        </div>
      </div>
      <Space h={5} />
      <div className="flex items-center gap-1 text-gray-800">
        <Title order={3}>${Math.round(product.price - product.price * (product.discountPercentage / 100))}</Title>
        <Title td="line-through" fw="normal" order={5} className="text-gray-400">
          ${product.price}
        </Title>
        <Space w={2} />
        <Badge radius="xl" px="3" color="yellow">
          {product.discountPercentage}%
        </Badge>
      </div>

      <Space h={15} />
      <Text size="sm" className="text-gray-400">
        Deskripsi
      </Text>
      <Text className="text-gray-700">{product.description}</Text>
      <Space h={10} />
      <Badge>{product.category}</Badge>
      <Space h={30} />
      <Divider />
      <Space h={10} />
      <ProductAction />
    </div>
  );
};

export default SideSection;
