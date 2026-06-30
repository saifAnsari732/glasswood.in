"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ReelsShowcase.module.css";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

const REEL_IDS = [
  "DaKEqOsCYej",
  "DaH4I7KCgnM",
  "DaFvykdCx7l",
  "DaArWYmhNaT",
  "DZ-QWH7SJvP",
  "DZ5MCdIyVdz",
  "DZu0jnJSxhz",
  "DZhlvtJC1cC"
];

export default function ReelsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 900) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 600) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, REEL_IDS.length - itemsPerView);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, maxIndex, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className={`section ${styles.reelsSection}`}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.subtitle}>VIRAL VIDEOS</span>
          <h2 className={styles.title}>SPOTTED ON <br /><span className="glow-text-gold">INSTAGRAM</span></h2>
          <p className={styles.largeDescription}>
            Real client spaces. Natural timber grain reveals.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className={styles.carouselWrapper}>
          <button 
            onClick={handlePrev} 
            className={`${styles.navBtn} ${styles.leftBtn}`}
            aria-label="Previous reels"
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.sliderViewport}>
            <div 
              className={styles.sliderTrack} 
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {REEL_IDS.map((id) => (
                <div 
                  key={id} 
                  className={styles.slide}
                  style={{ minWidth: `${100 / itemsPerView}%` }}
                >
                  <div className={styles.reelFrameContainer}>
                    <iframe
                      src={`https://www.instagram.com/reel/${id}/embed/`}
                      className={styles.instagramIframe}
                      scrolling="no"
                      allowFullScreen
                      allowTransparency
                      frameBorder="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleNext} 
            className={`${styles.navBtn} ${styles.rightBtn}`}
            aria-label="Next reels"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className={styles.indicatorBar}>
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ""}`}
              aria-label={`Go to slide group ${idx + 1}`}
            />
          ))}
        </div>

        <div className={styles.footerActions}>
          <a 
            href="https://www.instagram.com/glassnwood.in/reels/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Camera size={18} style={{ marginRight: "8px", verticalAlign: "middle" }} />
            <span>Follow @glassnwood.in</span>
          </a>
        </div>

      </div>
    </section>
  );
}
