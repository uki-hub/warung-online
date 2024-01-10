import { Anchor, Badge, TextInput, Title } from "@mantine/core";
import { VscAccount } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { BsHeart } from "react-icons/bs";

import { Link } from "react-router-dom";
import CartIcon from "./components/CartIcon";

const AppBar = () => {
  const searchButton = (
    <div className="flex justify-center items-center h-full w-full border-l ">
      <IoSearchOutline className="text-xl" />
    </div>
  );

  return (
    <div className="flex justify-center sticky shadow top-0 w-full h-24 bg-white py-5 z-[301]">
      <div className="flex flex-row justify-between items-center w-[80%]">
        <Link to={"/"}>
          <Title order={2}>ASD</Title>
        </Link>
        <div className="flex items-center gap-6 w-full max-w-[600px] mx-12">
          <Anchor underline="never" size="sm" c="cpink">
            Kategori
          </Anchor>
          <TextInput placeholder="Handpone" rightSection={searchButton} className="w-full" />
        </div>
        <div className="flex gap-10">
          <CartIcon />

          <div className="relative">
            <BsHeart className="text-2xl text-red-500" />
          </div>

          <div className="relative">
            <Badge circle size="sm" color="cpink" className="bg-pink-400 absolute right-[-10px] top-[-10px]">
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
