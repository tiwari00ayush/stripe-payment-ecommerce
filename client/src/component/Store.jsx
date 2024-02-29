import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Store = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=40");
        const productData = await res.json();

        setProducts(productData);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  return (
    <div className="flex flex-wrap justify-between py-8 px-4 gap-5">
      {products.length === 0 ? (
        <p>Loading</p>
      ) : (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      )}
    </div>
  );
};

export default Store;
