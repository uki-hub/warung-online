import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MdAdd, MdRemove } from "react-icons/md";
import useApp from "../../../../stores/useApp";
import usePersist from "../../../../stores/usePersist";
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
    });
  };

  return (
    <form className="flex flex-col gap-4 justify-end">
      <div className="flex ">
        <TextInput
          label="Jumlah"
          type="number"
          leftSection={
            <div
              className="mr-2 flex items-center justify-center w-full h-full border-r text-2xl cursor-pointer hover:bg-pink-50"
              onClick={() => setJumlah(-1)}
            >
              <MdRemove />
            </div>
          }
          rightSection={
            <div
              className="ml-2 flex items-center justify-center w-full h-full border-l text-2xl cursor-pointer hover:bg-pink-50"
              onClick={() => setJumlah(1)}
            >
              <MdAdd />
            </div>
          }
          className="w-24"
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
