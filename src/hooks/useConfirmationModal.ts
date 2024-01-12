import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import BaseState from "../models/bases/BaseState";

interface ConfirmationModalState extends BaseState {
  opened: boolean;
  answer: boolean;
  title?: string;
  body?: JSX.Element;
  onAnswer: (answer: boolean) => Promise<void>;

  actions: {
    open: (props: ConfirmationModalProps) => void;
    close: (answer: boolean) => Promise<void>;
  };
}

type ConfirmationModalProps = {
  title?: string;
  body?: JSX.Element;
  onAnswer: (answer: boolean) => Promise<void>;
};

const useConfirmationModal = create(
  immer<ConfirmationModalState>((set, get) => ({
    opened: false,
    answer: false,
    title: "",
    onAnswer: async () => {},
    actions: {
      open: (props: ConfirmationModalProps) => {
        set((state) => {
          state.title = props.title;
          state.body = props.body;
          state.onAnswer = props.onAnswer;
          state.opened = true;
        });
      },
      close: async (answer: boolean) => {
        await get().onAnswer(answer);

        set((state) => {
          state.answer = answer;
          state.opened = false;
        });
      },
    },
  }))
);

export default useConfirmationModal;
