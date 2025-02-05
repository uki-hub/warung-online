import { Checkbox, TextInput, Title, Button, PasswordInput, Space, Divider, Group, Anchor, Center, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import useApp from "../../../../stores/useApp";
import useQuerykey from "../../../../hooks/useQueryKey";
import { useMutation, useQuery } from "react-query";
import authApi from "../../../../apis/authApi";

const LoginForm = () => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => useApp.getState().pageLoginStore.actions.login(form.values.username, form.values.password, form.values.rememberMe),
    onSuccess: (success) => {
      if (success) navigate("/");
      else alert("wrong");
    },
    onError: (e) => {
      alert(e);
    },
  });

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
    mutate();
  };

  const onLupaPassword = () => useApp.getState().pageLoginStore.actions.formToggle("forgot");

  const onBuatAkun = () => useApp.getState().pageLoginStore.actions.formToggle("new");

  return (
    <form>
      <Title c="cpink">Masuk</Title>
      <Divider label="Masuk ke Warung Online" mt="sm" mb="md" />
      <TextInput label="Username" {...form.getInputProps("username")}></TextInput>
      <Space h="md" />
      <PasswordInput label="Password" {...form.getInputProps("password")}></PasswordInput>
      <Space h="xl" />
      <Button onClick={login} variant="filled" color="cpink" size="md" fullWidth>
        {isLoading ? <Loader size="sm" color="white" /> : "MASUK"}
      </Button>
      <Space h="md" />
      <Group justify="space-between">
        <Checkbox label="Ingatkan Saya" {...form.getInputProps("rememberMe", { type: "checkbox" })} />
        <Anchor component="button" type="button" c="dimmed" size="xs" onClick={onLupaPassword}>
          Lupa Password
        </Anchor>
      </Group>
      <Space h="lg" />
      <Center>
        <Anchor underline="never" onClick={onBuatAkun}>
          Buat Akun Baru
        </Anchor>
      </Center>
    </form>
  );
};

export default LoginForm;
