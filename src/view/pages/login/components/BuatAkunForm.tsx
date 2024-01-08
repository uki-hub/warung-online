import { Checkbox, TextInput, Title, Button, PasswordInput, Space, Divider, Group, Anchor, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import useLoginPageStore from "../../../../stores/pages/useLoginPageStore";

const BuatAkunForm = () => {
  const form = useForm({
    initialValues: {
      nama: "",
      username: "",
      password: "",
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (val) => (val.length <= 8 ? "Password should include at least 8 characters" : null),
    },
  });

  return (
    <>
      <Title c="pink">Buat Akun Baru</Title>
      <Space h="md" />
      <TextInput label="Nama"></TextInput>
      <Space h="md" />
      <TextInput label="Username"></TextInput>
      <Space h="md" />
      <PasswordInput label="Password"></PasswordInput>
      <Space h="sm" />
      <PasswordInput label="Masukan ulang Password"></PasswordInput>
      <Space h="md" />
      <TextInput label="Email" placeholder="emailaku@domain.com"></TextInput>
      <Space h="lg" />
      <Button variant="filled" fullWidth color="pink">
        DAFTAR
      </Button>
      <Space h="md" />
      <Center>
        <Anchor component="button" type="button" c="dimmed" size="xs" onClick={() => useLoginPageStore.getState().actions.formToggle("login")}>
          Sudah punya akun?
        </Anchor>
      </Center>
    </>
  );
};

export default BuatAkunForm;
