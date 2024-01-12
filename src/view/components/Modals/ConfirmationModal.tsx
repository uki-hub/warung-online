import { Button, Loader, Modal } from "@mantine/core";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { useState } from "react";

const ConfirmationModal = () => {
  const state = useConfirmationModal();

  const [loading, setLoading] = useState(false);
  //this not working becayse custom hooks scope only its in component use zustand global state mf

  const answerYes = async () => {
    if (loading) return;

    setLoading(true);
    await state.actions.close(true);
    setLoading(false);
  };

  return (
    <Modal id="uki" title={state.title} opened={state.opened} onClose={() => {}} withCloseButton={false} centered zIndex={302}>
      <div className="flex flex-col gap-4">
        {state.body && state.body}
        <div className="flex gap-2">
          <Button color="cpink" onClick={answerYes} className="flex-1">
            {loading ? <Loader size="sm" color="white" /> : "Ya"}
          </Button>
          <Button onClick={() => state.actions.close(false)} className="flex-1 bg-pink-300 hover:bg-pink-400">
            Tidak
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
