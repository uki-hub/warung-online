import { Anchor, Badge, Center, Space, Text, TextInput, Title } from "@mantine/core";
import { BsMinecart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";

const AppBar = () => {
  const searchButton = (
    <div className="flex justify-center items-center h-full w-full border-l ">
      <IoSearchOutline className="text-xl" />
    </div>
  );

  return (
    <div className="flex justify-center sticky shadow top-0 w-full h-24 bg-white mb-8 py-5 z-50">
      <div className="flex flex-row justify-between items-center w-[80%]">
        <Title order={2}>ASD</Title>
        <div className="flex items-center gap-6 w-full max-w-[600px] mx-12">
          <Anchor underline="never" size="sm" c="cpink">
            Kategori
          </Anchor>
          <TextInput placeholder="Handpone" rightSection={searchButton} className="w-full" />
        </div>
        <div className="flex gap-6">
          <div className="relative">
            <Badge size="xs" fw="bold" className="bg-pink-400 absolute right-[-5px] top-[-5px]">
              1
            </Badge>
            <BsMinecart className="text-2xl text-pink-600" />
          </div>
          <div className="relative">
            <Badge size="xs" color="cpink" className="bg-pink-400 absolute right-[-5px] top-[-5px]">
              1
            </Badge>
            <VscAccount className="text-2xl text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
