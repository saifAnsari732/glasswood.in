"use client";

import { motion } from "framer-motion";
import styles from "./Testimonials.module.css";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Aarav Sharma",
    location: "Mumbai, MH",
    review: "Absolutely stunning craftsmanship. The LED light has a seamless glow and the solid wood frame matches my cabinet perfectly. Safe packaging too!",
    rating: 5
  },
  {
    name: "Priyanka Patel",
    location: "Ahmedabad, GJ",
    review: "Requested a custom size arched mirror for my master dresser. They guided me through dimensions and wood polishing. The result is pure luxury.",
    rating: 5
  },
  {
    name: "Rohan Varma",
    location: "Bangalore, KA",
    review: "Extremely clean reflection without any distortion. The natural wood grain shows through beautifully. Will definitely order again for my hall room.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className={`section ${styles.testimonialsSection}`}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.subtitle}>VERIFIED FEEDBACK</span>
          <h2 className={styles.title}>LOVED BY <br /><span className="glow-text-teal">MODERN HOMES</span></h2>
          <p className={styles.largeDescription}>
            Unmatched customer satisfaction across major cities in India.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className={styles.grid}>
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.stars}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                ))}
              </div>
              <p className={styles.reviewText}>"{rev.review}"</p>
              <div className={styles.author}>
                <div>
                  <h4 className={styles.name}>{rev.name}</h4>
                  <span className={styles.location}>{rev.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
