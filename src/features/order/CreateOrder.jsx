import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import store from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const {
    userName,
    position,
    address,
    status: addressStatus,
    error: addressError,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((store) => store.cart.cart);
  console.log("createOrder", cart);
  const dispatch = useDispatch();
  const mainPrice = cart.reduce((sum, cur) => {
    return (sum += cur.totalPrice);
  }, 0);
  const priorityPrice = withPriority ? mainPrice * 0.2 : 0;
  const finalPrice = mainPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              defaultValue={userName}
              className="form-input w-full"
              name="customer"
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              className="form-input w-full"
              name="phone"
              required
            />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 text-xs text-red-700">{formErrors.phone}</p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              className="form-input w-full"
              required
            />
          </div>
          <span className="absolute right-1">
            {position && (
              <Button
                type="small"
                onClick={(e) => {
                  console.log("getposition");
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get your location
              </Button>
            )}
          </span>
          {addressStatus === "error" && (
            <p className="mt-2 text-xs text-red-700">{addressError}</p>
          )}
        </div>

        <div>
          <input
            className="rounded-9 mt-5 h-6 w-6 accent-yellow-400 focus:outline-offset-5 focus:outline-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => {
              setWithPriority(e.target.checked);
              console.log(withPriority);
            }}
          />
          <label className="items-center" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <Button type="primary" disabled={isLoading || isLoadingAddress}>
            {isLoading
              ? "submiting"
              : `Order now ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    // priority: data.withPriority,
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "give us a valid phone number";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
