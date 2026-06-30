"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Products.module.css";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";

const categories = ["All", "LED", "Wooden", "Modern"];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className={`section ${styles.productsSection}`}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.subtitle}>EXCLUSIVE COLLECTION</span>
          <h2 className={styles.title}>CHOOSE YOUR <br /><span className="glow-text-teal">MIRROR STATEMENT</span></h2>
          <p className={styles.largeDescription}>
            Bespoke wood framing meets pure HD glass. Select a category below.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid showing items with entrance animation */}
        <div className={styles.grid}>
          {filteredProducts.map((product, idx) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="product-card"
              style={{ display: 'block' }}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                <div className={styles.categoryBadge}>{product.category}</div>
                <div className={styles.cardShimmer}></div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className={styles.priceRow}>
                  <span className="product-price">{product.price}</span>
                  
                  <div>
                    <div className={styles.buyBtn}>
                      <span>View Details</span>
                      <ArrowUpRight size={14} className={styles.arrow} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footerActions}>
          <div className={styles.centerBtn}>
            <Link href="#contact" className="btn-outline">
              CUSTOM SIZE ORDER FORM
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
