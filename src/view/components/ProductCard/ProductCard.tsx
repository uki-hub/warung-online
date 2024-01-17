import { Badge, Card, Image, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../../../services/api/productApi";
import ProductModel from "../../../models/ProductModel";

const ProductCard = ({ product }: { product: ProductModel }) => {
  return (
    <div className="px-2 py-4 max-h-[64rem] w-full">
      <Link to={`/barang/${product.id}`}>
        <Card withBorder shadow="sm" padding="xs" radius="md" className="w-full h-[270px]">
          <Card.Section mb={5} className="relative">
            <Image h={150} fit="fill" src={product.thumbnail} />
            <Badge radius="xl" px="3" color="yellow" className="absolute right-2 top-2">
              {product.discountPercentage}%
            </Badge>
          </Card.Section>
          <Title order={5} fw="normal" lineClamp={2}>
            {product.title}
          </Title>
          <div className="flex items-center gap-1">
            <Text size="md" fw="bolder">
              ${product.price}
            </Text>
          </div>
          <div className="flex gap-1.5 mt-auto">
            <Badge fw="normal" radius="md" px="5" color="cyan">
              Sisa {product.stock}
            </Badge>
            <Badge fw="normal" radius="md" px="5" color="green">
              Rating {product.rating}
            </Badge>
          </div>
        </Card>
      </Link>
    </div>
  );
};

const ById = ({ productId }: { productId: number }) => {
  const [product, setProduct] = useState<ProductModel | undefined>();

  useEffect(() => {
    (async () => {
      const fetchedProduct = await productApi.getProduct(productId);

      setProduct(fetchedProduct.data);
    })();
  }, [productId]);

  if (product == undefined) return <p>Loading</p>;

  return <ProductCard product={product} />;
};

ProductCard.ById = ById;

export default ProductCard;
