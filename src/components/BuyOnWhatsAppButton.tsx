"use client";

import { MessageCircle } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function BuyOnWhatsAppButton({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();
  const WHATSAPP_NUMBER = "919162732242";

  const handleBuyNow = () => {
    addToCart(product);

    const currentCart = [...cart];
    const existing = currentCart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    const parsePrice = (priceStr: string) => {
      return parseInt(priceStr.replace(/[^\d]/g, ""), 10) || 0;
    };

    const itemLines = currentCart
      .map(
        (item) =>
          `• ${item.name} (${item.category}) — Qty: ${item.quantity} — ${item.price}`
      )
      .join("\n");

    const newTotalPrice = currentCart.reduce(
      (sum, item) => sum + parsePrice(item.price) * item.quantity,
      0
    );
    const totalLine = `\n💰 *Total: ₹${newTotalPrice.toLocaleString("en-IN")}*`;

    const message = encodeURIComponent(
      `Hello glasswood.in! 🪞\n\nI'd like to order the following:\n\n${itemLines}${totalLine}\n\nPlease confirm availability and share payment details. Thank you!`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <button onClick={handleBuyNow} className="btn-primary">
      <MessageCircle size={18} />
      <span>BUY ON WHATSAPP</span>
    </button>
  );
}
