"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Camera, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            glasswood<span className={styles.accent}>.in</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            <Link href="#hero" className={styles.navLink}>Home</Link>
            <Link href="#products" className={styles.navLink}>Collection</Link>
            <Link href="#features" className={styles.navLink}>Craftsmanship</Link>
            <Link href="/gallery" className={styles.navLink}>Gallery</Link>
            <Link 
              href="https://www.instagram.com/glassnwood.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >

              <span>Instagram</span>
            </Link>

            {/* Cart Button */}
            <button
              className={styles.cartBtn}
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  className={styles.cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </nav>

          <div className={styles.mobileRight}>
            {/* Mobile Cart */}
            <button
              className={styles.cartBtn}
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className={styles.cartCount}>{totalItems}</span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button 
              className={styles.mobileToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              className={styles.mobileNav}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.mobileNavContainer}>
                <Link href="#hero" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="#products" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Collection</Link>
                <Link href="#features" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Craftsmanship</Link>
                <Link href="/gallery" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
                <Link 
                  href="https://www.instagram.com/glassnwood.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                >
                  <Camera size={20} />
                  <span>Instagram</span>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
