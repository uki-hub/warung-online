import { Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useApp from "../../../../stores/useApp";
import usePersist from "../../../../stores/usePersist";
import { IoAdd, IoRemove } from "react-icons/io5";
const ProductAction = () => {
  const { product } = useApp((state) => state.pageBarangStore);

  const form = useForm({
    initialValues: {
      jumlah: 1,
    },
  });

  const setJumlah = (count: number) => form.setFieldValue("jumlah", form.values.jumlah + count);

  const addToCart = () => {
    usePersist.getState().cart_add({
      id: product!.id,
      count: form.values.jumlah,
      note: "",
      checked: true,
    });
  };

  return (
    <form className="flex flex-col gap-4 justify-end">
      <div className="flex ">
        <NumberInput
          label="Jumlah"
          w={85}
          maxLength={3}
          leftSectionWidth={25}
          rightSectionWidth={25}
          leftSection={<IoRemove className="cursor-pointer hover:text-pink-500" onClick={() => setJumlah(-1)} />}
          rightSection={<IoAdd className="cursor-pointer hover:text-pink-500" onClick={() => setJumlah(1)} />}
          classNames={{
            input: "text-center text-sm font-semibold text-gray-600",
          }}
          {...form.getInputProps("jumlah")}
        />
      </div>
      <Button size="md" color="cpink" fullWidth onClick={addToCart}>
        Tambahkan ke keranjang
      </Button>
    </form>
  );
};

export default ProductAction;
