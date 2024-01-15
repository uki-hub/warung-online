import { TextInput, Title, Space, Anchor, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import useApp from "../../../../stores/useApp";

const LupaPasswordForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onMasukAkun = () => useApp.getState().pageLoginStore.actions.formToggle("login");

  return (
    <>
      <Title c="cpink">Lupa Password</Title>
      <Space h="md" />
      <TextInput label="Email" placeholder="emailaku@domain.com"></TextInput>
      <Space h="lg" />
      <Button type="submit" variant="filled" color="cpink" size="md" fullWidth>
        {/* {state.loading ? <Loader size="sm" color="white" /> : "KIRIM EMAIL"} */}
        KIRIM EMAIL
      </Button>
      <Space h="md" />

      <Anchor component="button" type="button" c="dimmed" size="xs" onClick={onMasukAkun}>
        Masuk akun
      </Anchor>
    </>
  );
};

export default LupaPasswordForm;
