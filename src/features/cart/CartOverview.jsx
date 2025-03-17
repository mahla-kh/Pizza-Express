import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const cart = useSelector((store) => store.cart.cart);
  const mainPrice = cart.reduce((sum, cur) => {
    return (sum += cur.totalPrice);
  }, 0);
  const pizzaNum = cart.reduce((sum, cur) => {
    return (sum += cur.quantity);
  }, 0);

  if (!pizzaNum) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm font-semibold text-stone-200 uppercase md:text-base">
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{pizzaNum} pizzas</span>
        <span>{`$${formatCurrency(mainPrice)}`}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
