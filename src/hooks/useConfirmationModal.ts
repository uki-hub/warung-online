import { useDisclosure } from "@mantine/hooks";
import {  useState } from "react";

type ConfirmationModalType = {
  title: string;
  message: string;
  callback: (answer: boolean) => void;
};

const useConfirmationModal = () => {
  const initialState: ConfirmationModalType = {
    title: "",
    message: "",
    callback: () => {},
  };

  const [opened, modalActions] = useDisclosure(false);

  const [state, setState] = useState<ConfirmationModalType>(initialState);

  const open = (props: ConfirmationModalType) => {
    setState(props);
    modalActions.open();
  };

  const close = () => {
    modalActions.close();
  };

  return {
    opened,
    state,
    actions: { open, close },
  };
};

export default useConfirmationModal;
