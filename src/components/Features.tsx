import styles from "./Features.module.css";
import { Sparkles, ShieldCheck, Truck, Home } from "lucide-react";

const features = [
  {
    title: "HD Reflection",
    description: "Our mirrors use premium quality glass providing crystal clear, distortion-free reflection.",
    icon: <Sparkles size={32} className={styles.icon} />
  },
  {
    title: "Custom Wood Frames",
    description: "Handcrafted frames made from authentic, durable wood tailored to your aesthetic.",
    icon: <Home size={32} className={styles.icon} />
  },
  {
    title: "Safe Delivery",
    description: "Specialized secure packaging to ensure your mirror arrives in perfect condition.",
    icon: <Truck size={32} className={styles.icon} />
  },
  {
    title: "Quality Guaranteed",
    description: "We stand behind our craftsmanship with a satisfaction guarantee on all our products.",
    icon: <ShieldCheck size={32} className={styles.icon} />
  }
];

export default function Features() {
  return (
    <section id="features" className={`section ${styles.featuresSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>The <span className={styles.accent}>glasswood.in</span> Difference</h2>
          <p className={styles.subtitle}>Craftsmanship that stands the test of time</p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconContainer}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
