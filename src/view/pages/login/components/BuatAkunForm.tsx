import { TextInput, Title, Button, PasswordInput, Space, Anchor, Center, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import useApp from "../../../../stores/useApp";

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

  const onMasukAkun = () => useApp.getState().pageLoginStore.actions.formToggle("login");

  return (
    <>
      <Title c="cpink">Buat Akun Baru</Title>
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
      <Space h="md" />
      <TextInput label="No HP" type="number" placeholder="081234567"></TextInput>
      <Space h="lg" />
      <Button type="submit" variant="filled" color="cpink" size="md" fullWidth>
        {/* {state.loading ? <Loader size="sm" color="white" /> : "BUAT AKUN"} */}
        BUAT AKUN
      </Button>
      <Space h="md" />
      <Center>
        <Anchor component="button" type="button" c="dimmed" size="xs" onClick={onMasukAkun}>
          Sudah punya akun?
        </Anchor>
      </Center>
    </>
  );
};

export default BuatAkunForm;
