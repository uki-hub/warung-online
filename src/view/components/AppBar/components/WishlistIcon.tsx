import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const WishlistIcon = () => {
  return (
    <Link to={"/wishlist"} className="group w-6 relative cursor-pointer text-2xl">
      <BsHeart className="absolute text-gray-400 " />
      <BsHeartFill className="transition-all ease-in absolute text-red-500 scale-0 group-hover:scale-100" />
    </Link>
  );
};

export default WishlistIcon;
