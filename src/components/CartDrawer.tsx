"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, checkoutWhatsApp, clearCart } = useCart();

  const handleCheckout = () => {
    checkoutWhatsApp();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <ShoppingBag size={20} />
                <h2>My Cart {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}</h2>
              </div>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className={styles.itemsList}>
              {cart.length === 0 ? (
                <div className={styles.emptyState}>
                  <ShoppingBag size={48} className={styles.emptyIcon} />
                  <p>Your cart is empty</p>
                  <span>Add mirrors from our collection</span>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className={styles.cartItem}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                    >
                      <div className={styles.itemImage}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className={styles.itemDetails}>
                        <h4>{item.name}</h4>
                        <span className={styles.itemCategory}>{item.category}</span>
                        <span className={styles.itemPrice}>{item.price}</span>
                        <div className={styles.quantityRow}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className={styles.qty}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            className={styles.removeBtn}
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer: Total + Checkout */}
            {cart.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span>Total ({totalItems} items)</span>
                  <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                </div>
                <button className={styles.checkoutBtn} onClick={handleCheckout}>
                  <MessageCircle size={18} />
                  <span>Order via WhatsApp</span>
                </button>
                <button className={styles.clearBtn} onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
