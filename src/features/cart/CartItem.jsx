import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  if (!quantity) return null;

  return (
    <li className="flex flex-wrap justify-between py-4 sm:flex-row">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId}></UpdateItemQuantity>
        <Button
          type="small"
          onClickHandler={() => dispatch(deleteItem(pizzaId))}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
