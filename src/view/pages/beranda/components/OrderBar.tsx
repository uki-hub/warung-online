import { Button, Menu, Text, TextInput, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import useBerandaPageStore from "../../../../stores/pages/useBerandaPageStore";

const alerts = () => {
  alert('asd');
}

const OrderBar = () => {
  const state = useBerandaPageStore((state) => ({ loaded: state.loaded, loading: state.loading }));
  const [open, setOpen] = useState(false);

  const disabled = !state.loaded && state.loading;

  console.log(disabled);

  const rekomendasi = (
    <Menu position="bottom-start" width="target" shadow="md" disabled={disabled} clickOutsideEvents={["alerts"]} withinPortal>
      <Menu.Target>
        <div
          className={`border border-gray-300 px-3 py-1 text-sm rounded text-gray-500 cursor-pointer ${
            disabled ? "bg-gray-100 border-gray-200 text-gray-300" : ""
          }`}
        >
          Berdasarkan: {!disabled && <span className="font-semibold text-gray-700">Rekomendasi</span>}
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Rekomendasi</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Terjual</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Rating</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Termurah</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Termahal</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  const harga = (
    <Menu position="bottom-start" shadow="md" opened={open} disabled={disabled} withinPortal>
      <Menu.Target>
        <div
          onClick={() => setOpen(!open)}
          className={`border border-gray-300 px-3 py-1 text-sm rounded text-gray-500 cursor-pointer ${
            disabled ? "bg-gray-100 border-gray-200 text-gray-300" : ""
          }`}
        >
          Harga
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item className="!bg-transparent">
          <Menu.Label p={0}>Minimal</Menu.Label>
          <TextInput leftSection={<Text>$</Text>}></TextInput>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="!bg-transparent">
          <Menu.Label p={0}>Maksimal</Menu.Label>
          <TextInput leftSection={<Text>$</Text>}></TextInput>
        </Menu.Item>
        <Menu.Item className="!bg-transparent">
          <Button onClick={() => setOpen(false)} fullWidth>
            Terapkan
          </Button>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <div className="flex flex-col gap-1 px-2">
      <Text size="sm" className="text-gray-400">
        Urutkan produk
      </Text>
      <div className="flex gap-2 ">
        {rekomendasi}
        {harga}
      </div>
    </div>
  );
};

export default OrderBar;
