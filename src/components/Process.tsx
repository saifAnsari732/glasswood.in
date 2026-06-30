"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./Process.module.css";
import { Trees, Compass, Hammer, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Trees size={28} />,
    title: "Wood Selection",
    description: "Premium teak boards selected for rich grain density."
  },
  {
    icon: <Compass size={28} />,
    title: "Precision Carving",
    description: "Local carving done by master carpenters."
  },
  {
    icon: <Hammer size={28} />,
    title: "Glass Fitting",
    description: "Pure high-definition safety-backed glass install."
  },
  {
    icon: <Sparkles size={28} />,
    title: "Finishing & Polish",
    description: "Polished to preserve the organic wood grain texture."
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className={`section ${styles.processSection}`}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.subtitle}>CRAFT TIMELINE</span>
          <h2 className={styles.title}>THE SHAPING OF <br /><span className="glow-text-gold">PERFECTION</span></h2>
          <p className={styles.largeDescription}>
            Four steps of dedicated carpentry and pristine reflection.
          </p>
        </div>

        {/* Timeline Container */}
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}>
            <motion.div 
              style={{ scaleY, transformOrigin: "top" }}
              className={styles.progressLine}
            />
          </div>

          <div className={styles.timelineList}>
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  className={`${styles.timelineItem} ${isEven ? styles.leftSide : styles.rightSide}`}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.card}>
                    <div className={`${styles.stepNum} glow-text-teal`}>0{idx + 1}</div>
                    <div className={styles.iconBox}>{step.icon}</div>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.cardDesc}>{step.description}</p>
                  </div>
                  
                  <motion.div 
                    className={styles.timelineNode}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
