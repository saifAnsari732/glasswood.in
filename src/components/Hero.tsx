"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./Hero.module.css";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} id="hero" className={styles.heroSection}>
      <div className={styles.bgGradientBlob1}></div>
      <div className={styles.bgGradientBlob2}></div>

      {/* Editorial Vertical Side Texts */}
      <div className={styles.sideTextLeft}>
        <span>ESTD 2026 — glasswood.in ORIGINALS</span>
      </div>
      <div className={styles.sideTextRight}>
        <span>SCROLL TO REFLECT COLLECTION</span>
      </div>

      <div className={`container ${styles.centeredContainer}`}>
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className={styles.contentColCentered}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>GLASS & WOOD STUDIO</span>
          </motion.div>
          
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* drmhozesdmh;ldemtzn;lmdt; */}
           Siwan Ka Trusted Glass & 
            <span className="glow-text-teal">  Mirror Shop</span>
            <span className="text-sky-600">PURE LUXURY</span>
          </motion.h1>
          
          <motion.div 
            className={styles.largeStatement}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={`styles.minimalSubtext  !text-md`}>
             Glass N Wood Siwan mein hum premium quality Glass, Designer Mirrors, Touch Sensor LED Mirrors, Toughened Glass, CNC Glass & Wood Carving, Acrylic LED Sign Boards aur customized interior glass solutions provide karte hain
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#products" className="btn-primary">
                <span className={styles.btnText}>SHOP THE COLLECTION</span>
                <ArrowRight size={18} className={styles.btnIcon} />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#contact" className="btn-outline">
                REQUEST CUSTOM SIZE
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite loop scrolling text marquee banner */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          <span>CRAFTED IN INDIA • SUSTAINABLE TEAK • HD MIRROR CUTS • BESPOKE DESIGN SIZES • PREMIUM GLOW LEDS • ARTISAN HANDCARVING •&nbsp;</span>
          <span>CRAFTED IN INDIA • SUSTAINABLE TEAK • HD MIRROR CUTS • BESPOKE DESIGN SIZES • PREMIUM GLOW LEDS • ARTISAN HANDCARVING •&nbsp;</span>
        </div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </motion.div>
    </section>
  );
}
