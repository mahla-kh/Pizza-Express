import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {loading && <Loader />}
      <Header />
      <main className="mx-auto min-w-70 overflow-auto md:min-w-150">
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
