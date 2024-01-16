import { Button, Modal, Space, Textarea } from "@mantine/core";
import { SlNote } from "react-icons/sl";
import ProductModel from "../../../../models/ProductModel.ts";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import usePersist from "../../../../stores/usePersist.ts";

//FIX THIS
const UpdateNote = ({ product }: { product: ProductModel }) => {
  const persist = usePersist();

  const [opened, { open, close }] = useDisclosure(false);

  const productNote = persist.cart_getCartById(product.id)?.note;

  const form = useForm({
    initialValues: {
      note: productNote,
    },
  });

  const SaveNote = () => {
    persist.cart_updateNote(product.id, form.values.note);

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
            <Textarea placeholder="Tambahkan catatan" autosize {...form.getInputProps("note")} />
            <Space h={20} />
            <Button color="cpink" fullWidth onClick={SaveNote}>
              Simpan
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <div onClick={open} className="w-min flex items-start gap-2 pl-8 cursor-pointer  text-gray-400 hover:text-gray-800">
        <SlNote className={`shrink-0 ${productNote == "" ? "" : "text-gray-600"}`} />
        {productNote == "" ? (
          <span className="text-sm italic shrink-0">Tambahkan catatan</span>
        ) : (
          <span className="line-clamp-2 break-all text-sm shrink-0 text-gray-600">{productNote}</span>
        )}
      </div>
    </>
  );
};

export default UpdateNote;
