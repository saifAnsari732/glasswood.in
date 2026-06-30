"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Images } from "lucide-react";
import styles from "./gallery.module.css";

const ALL_IMAGES = [
  { src: "/hero.jpg",              label: "Hero Showcase",             category: "Featured" },
  { src: "/led-mirror.jpg",        label: "LED Glow Mirror",           category: "LED"      },
  { src: "/oval-mirror.jpg",       label: "Oval Premium Mirror",       category: "Wooden"   },
  { src: "/standing-mirror.jpg",   label: "Standing Full-Length",      category: "Wooden"   },
  { src: "/decorative-mirror.jpg", label: "Decorative Wall Mirror",    category: "Wooden"   },
  { src: "/images/cnc_wood_carving_1782718789445.jpg",   label: "CNC Wood Carving",          category: "Wooden" },
  { src: "/images/calligraphy_mirror_1782718741704.jpg", label: "Calligraphy Mirror",         category: "Modern" },
  { src: "/images/acrylic_signage_1782718768113.jpg",    label: "Acrylic Neon Signage",       category: "LED"    },
  { src: "/images/islamic_glass_1_1782718887112.jpg",    label: "Islamic Glass — Series I",   category: "Modern" },
  { src: "/images/islamic_glass_2_1782718899436.jpg",    label: "Islamic Glass — Series II",  category: "Modern" },
  { src: "/images/islamic_glass_3_1782718912468.jpg",    label: "Islamic Glass — Series III", category: "Modern" },
  { src: "/images/islamic_glass_5_1782718943202.jpg",    label: "Islamic Glass — Series V",   category: "Modern" },
  { src: "/images/islamic_glass_6_1782718954650.jpg",    label: "Islamic Glass — Series VI",  category: "Modern" },
];

const CATEGORIES = ["All", "Featured", "LED", "Wooden", "Modern"];
const catCount = (cat: string) =>
  cat === "All" ? ALL_IMAGES.length : ALL_IMAGES.filter(i => i.category === cat).length;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? ALL_IMAGES
    : ALL_IMAGES.filter(img => img.category === activeCategory);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : 0);
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : 0);

  return (
    <main className={styles.page}>

      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.heroTag}>
          <Images size={16} />
          Complete Showcase
        </div>
        <h1 className={styles.heroTitle}>
          Our <span className={styles.heroTitleAccent}>Image Gallery</span>
        </h1>
        <p className={styles.heroSub}>
          {ALL_IMAGES.length} premium images from our glass mirrors &amp; wood artistry collection.
        </p>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ""}`}
            >
              {cat} <span className={styles.filterCount}>({catCount(cat)})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Image Grid ── */}
      <section className={styles.gridSection}>
        <p className={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> image{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" && ` in "${activeCategory}"`}
        </p>

        <motion.div layout className={styles.imageGrid}>
          <AnimatePresence>
            {filtered.map((img, idx) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className={styles.card}
                onClick={() => setLightboxIndex(idx)}
              >
                <div className={styles.cardImage}>
                  <img src={img.src} alt={img.label} />
                  <div className={styles.cardOverlay}>
                    <ZoomIn size={30} className={styles.cardZoomIcon} />
                  </div>
                  <span className={styles.cardBadge}>{img.category}</span>
                </div>
                <div className={styles.cardLabel}>
                  <p>{img.label}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className={styles.lightboxClose} onClick={closeLightbox}>
              <X size={20} />
            </button>

            <button className={styles.lightboxPrev} onClick={e => { e.stopPropagation(); prev(); }}>
              <ChevronLeft size={24} />
            </button>

            <motion.div
              key={lightboxIndex}
              className={styles.lightboxContent}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].label}
                className={styles.lightboxImg}
              />
              <div className={styles.lightboxCaption}>
                <p>{filtered[lightboxIndex].label}</p>
                <span>{lightboxIndex + 1} / {filtered.length}</span>
              </div>
            </motion.div>

            <button className={styles.lightboxNext} onClick={e => { e.stopPropagation(); next(); }}>
              <ChevronRight size={24} />
            </button>

            {/* Thumbnail strip */}
            <div className={styles.thumbStrip} onClick={e => e.stopPropagation()}>
              {filtered.map((img, i) => (
                <div
                  key={img.src}
                  className={`${styles.thumb} ${i === lightboxIndex ? styles.thumbActive : ""}`}
                  onClick={() => setLightboxIndex(i)}
                >
                  <img src={img.src} alt="" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
