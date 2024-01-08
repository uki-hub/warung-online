import { Checkbox, TextInput, Title, Button, PasswordInput, Space, Divider, Group, Anchor, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import useLoginPageStore from "../../../../stores/pages/useLoginPageStore";


const LoginForm = () => {


  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (val) => (val.length <= 8 ? "Password should include at least 8 characters" : null),
    },
  });

  return (
    <form>
      <Title c="pink">Masuk</Title>
      <Divider label="Masuk ke Warung Online" mt="sm" mb="md" />
      <TextInput label="Username"></TextInput>
      <Space h="md" />
      <PasswordInput label="Password"></PasswordInput>
      <Space h="xl" />
      <Button variant="filled" fullWidth color="pink">
        MASUK
      </Button>
      <Space h="md" />
      <Group justify="space-between">
        <Checkbox label="Remember me" />
        <Anchor component="button" type="button" c="dimmed" size="xs" onClick={() => useLoginPageStore.getState().actions.formToggle("forgot")} >
          Lupa Password
        </Anchor>
      </Group>
      <Space h="lg" />
      <Center>
        <Anchor underline="never" onClick={() => useLoginPageStore.getState().actions.formToggle("new")}>Buat Akun Baru</Anchor>
      </Center>
    </form>
  );
};

export default LoginForm;
