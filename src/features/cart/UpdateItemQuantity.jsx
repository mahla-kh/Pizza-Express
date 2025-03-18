import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ children, id }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-center justify-around gap-2">
      <Button
        type="rounded"
        onClickHandler={() => dispatch(decreaseItemQuantity(id))}
      >
        -
      </Button>
      {children}
      <Button
        type="rounded"
        onClickHandler={() => dispatch(increaseItemQuantity(id))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
