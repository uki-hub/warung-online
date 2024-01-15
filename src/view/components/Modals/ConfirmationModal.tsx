import { Button, Loader, Modal } from "@mantine/core";
import { useState } from "react";
import useApp from "../../../stores/useApp";

const ConfirmationModal = () => {
  const store = useApp((state) => state.ConfirmationModalStore);

  const [loading, setLoading] = useState(false);
  //this not working becayse custom hooks scope only its in component use zustand global state mf

  const answerYes = async () => {
    if (loading) return;

    setLoading(true);
    await store.actions.close(true);
    setLoading(false);
  };

  return (
    <Modal id="uki" title={store.title} opened={store.opened} onClose={() => {}} withCloseButton={false} centered zIndex={302}>
      <div className="flex flex-col gap-4">
        {store.body && store.body}
        <div className="flex gap-2">
          <Button color="cpink" onClick={answerYes} className="flex-1">
            {loading ? <Loader size="sm" color="white" /> : "Ya"}
          </Button>
          <Button onClick={() => store.actions.close(false)} className="flex-1 bg-pink-300 hover:bg-pink-400">
            Tidak
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
