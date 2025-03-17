import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ id }) {
  const dispatch = useDispatch();
  const item = useSelector((store) =>
    store.cart.cart.find((item) => item.pizzaId === id),
  );
  return (
    <div className="flex flex-row items-center justify-around gap-2">
      <Button
        type="small"
        onClickHandler={() => dispatch(decreaseItemQuantity(id))}
      >
        -
      </Button>
      <p>{item.quantity}</p>
      <Button
        type="small"
        onClickHandler={() => dispatch(increaseItemQuantity(id))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
