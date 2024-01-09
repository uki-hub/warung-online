import { Button, Menu, Text, TextInput, UnstyledButton } from "@mantine/core";
import { useState } from "react";

const OrderBar = () => {
  const [open, setOpen] = useState(false);

  const rekomendasi = (
    <Menu position="bottom-start" width="target" shadow="md" withinPortal>
      <Menu.Target>
        <div className="border border-gray-300 px-3 py-1 text-sm rounded text-gray-500 cursor-pointer">
          Berdasarkan: <span className="font-semibold text-gray-700">Rekomendasi</span>
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
    <Menu position="bottom-start" shadow="md" closeOnItemClick={true} opened={open} withinPortal>
      <Menu.Target>
        <div className="border border-gray-300 px-3 py-1 text-sm rounded text-gray-500 cursor-pointer">Harga</div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item className="!bg-transparent">
          <Menu.Label p={0}>Terkecil</Menu.Label>
          <TextInput></TextInput>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="!bg-transparent">
          <Menu.Label p={0}>Terbesar</Menu.Label>
          <TextInput></TextInput>
        </Menu.Item>
        <Menu.Item className="!bg-transparent">
          <Button onClick={() => setOpen(!open)}>Terapkan</Button>
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
