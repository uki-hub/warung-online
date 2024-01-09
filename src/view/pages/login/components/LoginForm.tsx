import { Checkbox, TextInput, Title, Button, PasswordInput, Space, Divider, Group, Anchor, Center, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import useLoginPageStore from "../../../../stores/pages/useLoginPageStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const state = useLoginPageStore();
  const form = useForm({
    initialValues: {
      username: "kminchelle",
      password: "0lelplR",
      rememberMe: false,
    },
    validate: {
      password: (val) => (val.length <= 8 ? "Password should include at least 8 characters" : null),
    },
  });

  const login = async () => {
    const success = await state.actions.login(form.values.username, form.values.password, form.values.rememberMe);

    if (!success) {
      //failed login
      alert('failed')
      return;
    }

    navigate("/");
  };

  return (
    <form>
      <Title c="cpink">Masuk</Title>
      <Divider label="Masuk ke Warung Online" mt="sm" mb="md" />
      <TextInput label="Username" {...form.getInputProps("username")}></TextInput>
      <Space h="md" />
      <PasswordInput label="Password" {...form.getInputProps("password")}></PasswordInput>
      <Space h="xl" />
      <Button onClick={login} variant="filled" color="cpink" size="md" fullWidth>
        {state.loading ? <Loader size="sm" color="white" /> : "MASUK"}
      </Button>
      <Space h="md" />
      <Group justify="space-between">
        <Checkbox label="Ingatkan Saya" {...form.getInputProps("rememberMe", { type: "checkbox" })} />
        <Anchor component="button" type="button" c="dimmed" size="xs" onClick={() => useLoginPageStore.getState().actions.formToggle("forgot")}>
          Lupa Password
        </Anchor>
      </Group>
      <Space h="lg" />
      <Center>
        <Anchor underline="never" onClick={() => useLoginPageStore.getState().actions.formToggle("new")}>
          Buat Akun Baru
        </Anchor>
      </Center>
    </form>
  );
};

export default LoginForm;
