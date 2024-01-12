import { Button, Modal, Space, Textarea } from "@mantine/core";
import useCartStore from "../../../../stores/app/useCartStore.ts";
import { SlNote } from "react-icons/sl";
import ProductModel from "../../../../models/ProductModel.ts";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

const UpdateNote = ({ product }: { product: ProductModel }) => {
  const state = useCartStore();

  const [opened, { open, close }] = useDisclosure(false);

  const productNote = state.actions.getCartById(product.id)?.note;

  const form = useForm({
    initialValues: {
      note: productNote,
    },
  });

  const SaveNote = () => {
    state.actions.updateNote(product.id, form.values.note);

    close();
  };

  return (
    <>
      <Modal.Root zIndex={302} opened={opened} onClose={close} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              Catatan untuk <span className="font-semibold">{product.title}</span>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Textarea autosize {...form.getInputProps("note")} />
            <Space h={20} />
            <Button color="cpink" fullWidth onClick={SaveNote}>
              Simpan
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <div onClick={open} className="flex items-start gap-2 pl-8 cursor-pointer  text-gray-400 hover:text-gray-800">
        <SlNote className={`shrink-0 ${productNote == "" ? "" : "text-gray-600"}`} />
        {productNote == "" ? (
          <span className="text-sm italic">Tambahkan catatan</span>
        ) : (
          <span className="line-clamp-2 break-all text-sm text-gray-600">{productNote}</span>
        )}
      </div>
    </>
  );
};

export default UpdateNote;
