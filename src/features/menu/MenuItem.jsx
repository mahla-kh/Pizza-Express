import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart.cart);
  const item = cart.find((item) => item.pizzaId === id);
  const isInCart = cart.find((item) => item.pizzaId === id) ? true : false;

  function addItemHandler(e) {
    e.preventDefault();
    dispatch(
      addItem({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice,
      }),
    );
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={id}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase grayscale">
              Sold out
            </p>
          )}
          {isInCart && (
            <>
              <UpdateItemQuantity id={id}>{item.quantity}</UpdateItemQuantity>
              <Button
                type="small"
                onClickHandler={() => dispatch(deleteItem(id))}
              >
                Delete
              </Button>
            </>
          )}
          {!soldOut && !isInCart && (
            <Button onClickHandler={addItemHandler} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
