import { TextInput, Title, Space, Anchor, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import useLoginPageStore from "../../../../stores/pages/useLoginPageStore";

const LupaPasswordForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <Title c="pink">Lupa Password</Title>
      <Space h="md" />
      <TextInput label="Email" placeholder="emailaku@domain.com"></TextInput>
      <Space h="lg" />
      <Button variant="filled" fullWidth color="pink">
        KIRIM EMAIL
      </Button>
      <Space h="md" />

      <Anchor component="button" type="button" c="dimmed" size="xs" onClick={() => useLoginPageStore.getState().actions.formToggle("login")}>
        Masuk akun
      </Anchor>
    </>
  );
};

export default LupaPasswordForm;
