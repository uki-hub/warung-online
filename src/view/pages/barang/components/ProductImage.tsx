import { AspectRatio, Image, Overlay } from "@mantine/core";
import useApp from "../../../../stores/useApp";

const ProductImage = () => {
  const { product, indexImage } = useApp((state) => state.pageBarangStore);

  const images = [product!.thumbnail, ...product!.images];

  const onImageClick = (i: number) => {
    useApp.getState().pageBarangStore.actions.setIndexImage(i);
  };

  return (
    <div className="flex flex-col gap-5 w-[60%] max-w-[650px] overflow-hidden">
      <div className="h-[450px] ">
        <Image fit="contain" src={images[indexImage]} className="rounded-lg h-full" />
      </div>
      <div className="grid grid-flow-row grid-cols-6 gap-2 overflow-x-auto cursor-pointer">
        {images.map((u, i) => (
          <AspectRatio key={i}>
            <div className="!h-[80px] rounded-lg overflow-hidden" onClick={() => onImageClick(i)}>
              <Image fit="contain" src={u} />
              <Overlay className="transition-opacity opacity-0 hover:opacity-50" />
            </div>
          </AspectRatio>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
