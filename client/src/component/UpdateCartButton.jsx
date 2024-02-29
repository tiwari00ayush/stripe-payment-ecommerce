import React from "react";
import { useCartContext } from "../context/CartContext";

const UpdateCartButton = ({ id }) => {
  const { cart, setCart } = useCartContext();

  const decreaseQty = () => {
    const updatedCart = { ...cart };
    if (cart[id].qty === 1) {
      delete updatedCart[id];
      setCart(updatedCart);
    } else {
      updatedCart[id].qty -= 1;
      setCart(updatedCart);
    }
  };
  const increaseQty = () => {
    const rest = cart[id];
    const updatedQty = cart[id].qty + 1;
    setCart({ ...cart, [id]: { ...rest, ["qty"]: updatedQty } });
  };
  return (
    <div className="flex justify-center items-center gap-10 py-3">
      <button
        onClick={decreaseQty}
        className="w-[40px] h-[30px]  rounded-full bg-yellow-200"
      >
        -
      </button>
      <p>{cart[id]?.qty}</p>
      <button
        onClick={increaseQty}
        className="w-[40px] h-[30px]  rounded-full bg-yellow-200"
      >
        +
      </button>
    </div>
  );
};

export default UpdateCartButton;
