import { BaseStore, ImmerStateCreator } from "../../abstractions/BaseStore";


type ConfirmationModalProps = {
  title?: string;
  body?: JSX.Element;
  onAnswer: (answer: boolean) => Promise<void>;
};

export interface ConfirmationModalStore extends BaseStore {
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

export interface ConfirmationModalSlice {
  ConfirmationModalStore: ConfirmationModalStore;
}

export const createConfirmationModalSlice: ImmerStateCreator<ConfirmationModalSlice> = (set, get) => ({
  ConfirmationModalStore: {
    opened: false,
    answer: false,
    onAnswer: async () => {},
    actions: {
      open: (props: ConfirmationModalProps) => {
        set((state) => {
          state.ConfirmationModalStore.title = props.title;
          state.ConfirmationModalStore.body = props.body;
          state.ConfirmationModalStore.onAnswer = props.onAnswer;
          state.ConfirmationModalStore.opened = true;
        });
      },
      close: async (answer: boolean) => {
        await get().ConfirmationModalStore.onAnswer(answer);

        set((state) => {
          state.ConfirmationModalStore.answer = answer;
          state.ConfirmationModalStore.opened = false;
        });
      },
    },
  },
});
