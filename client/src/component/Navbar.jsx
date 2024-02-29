import React, { useState } from "react";
import { useCartContext } from "../context/CartContext";
import UpdateCartButton from "./UpdateCartButton";

const Navbar = () => {
  const { cart, getCartTotal } = useCartContext();

  const [showCart, setShowCart] = useState(false);
  const handlePayment = async () => {
    let itemList = [];
    Object.keys(cart).map((id) =>
      itemList.push({
        id,
        quantity: cart[id].qty,
      })
    );

    await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: itemList }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.url) {
          window.location.assign(data.url);
        }
      });
  };
  return (
    <div className="w-[100%] bg-blue-300 flex justify-between items-center py-2 px-5 relative">
      <h1 className="logo text-3xl font-bold">Ecommerce</h1>

      <button
        className="p-4 bg-red-500 text-white rounded-lg"
        onClick={() => setShowCart((prev) => !prev)}
      >
        Cart
      </button>
      <div
        className={`w-[50%] h-screen  top-0 right-0 bottom-0 bg-white z-10 shadow-lg  ease-in-out duration-200 overflow-scroll fixed ${
          showCart ? "block" : "hidden"
        }`}
      >
        <div className="h-full w-full relative py-2">
          <div className="absolute top-2 left-0 right-0 px-2 flex justify-between items-center ">
            <h1>Cart</h1>
            <button
              onClick={() => setShowCart((prev) => !prev)}
              className=" px-4 py-2 rounded-md bg-gray-400"
            >
              Close
            </button>
          </div>
          <div className="py-10 overflow-scroll h-full">
            {Object.keys(cart).length === 0 ? (
              <p className="w-full h-full flex justify-center items-center text-red-400">
                Cart is empty
              </p>
            ) : (
              Object.keys(cart).map((id) => (
                <div
                  key={id}
                  className="bg-yellow-500 my-2 flex flex-wrap justify-between items-center px-2 py-4"
                >
                  <p className="flex-1 text-left">{cart[id].title}</p>
                  <UpdateCartButton id={id} />
                  <p className="flex-1 text-right">
                    Rs {cart[id].qty * cart[id].price}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="absolute bottom-0 right-0 left-0 py-3 flex justify-between items-center px-2 border-t-2 bordert-t-black z-30 bg-gray-300">
            <p>Total : {getCartTotal()}</p>
            <button
              className="py-2 px-2 bg-green-500 text-white"
              onClick={() => {
                handlePayment();
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
