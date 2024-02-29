import React, { useState } from "react";
import { useCartContext } from "../context/CartContext";
import UpdateCartButton from "./UpdateCartButton";

const ProductCard = ({ product }) => {
  const { id, title, price, description, image } = product;

  const { cart, setCart } = useCartContext();
  const addToCart = () => {
    setCart((prev) => {
      return { ...prev, [id]: { id, title, price, qty: 1 } };
    });
  };

  return (
    <div className="flex flex-col w-[300px] m-2 shadow-lg hover:scale-110 ease-in-out duration-150 relative">
      <img
        src={image}
        alt="product image"
        className="w-[300px] h-[250px] object-cover rounded-md"
      />
      <div className="px-2">
        <h1 className="font-bold text-[1.1rem] py-1">{title}</h1>
        <p className="text-[0.8rem] text-gray-400">
          {description.slice(0, 50)}...
        </p>
        <p className="pt-2 pb-10">Rs {price}</p>
      </div>
      {cart[id] !== undefined ? (
        <UpdateCartButton id={id} />
      ) : (
        <button
          className="py-2 w-[100%] bg-green-500 absolute bottom-0 right-0 left-0 text-white"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
