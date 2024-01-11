import { Button, Modal, Text } from "@mantine/core";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { useEffect } from "react";

const ConfirmationModal = () => {
  const s = useConfirmationModal();
  //this not working becayse custom hooks scope only its in component use zustand global state mf

  let answerValue: boolean = false;

  const answer = (value: boolean) => {
    answerValue = value;
    s.actions.close();
    s.state.callback(answerValue);
  };

  useEffect(() => {
    s.actions.open({
      title: "",
      message: "",
      callback: () => {},
    });
  }, []);

  return (
    <Modal id="uki" title={s.state.title} opened={s.opened} onClose={() => answer(false)} withCloseButton centered zIndex={302}>
      <div className="flex flex-col gap-2">
        <Text size="md" className="text-gray-700">
          {s.state.message}
        </Text>
        <div className="flex gap-4">
          <Button onClick={() => answer(true)}>Ya</Button>
          <Button onClick={() => answer(false)}>Tidak</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
