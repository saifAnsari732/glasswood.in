"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button onClick={handleAdd} className="btn-outline">
      {added ? (
        <>
          <Check size={18} />
          <span>ADDED TO CART</span>
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          <span>ADD TO CART</span>
        </>
      )}
    </button>
  );
}
