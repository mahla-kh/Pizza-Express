import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 font-medium uppercase">
      <Link to="/" className="tracking-widest">
        fast pizza co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
