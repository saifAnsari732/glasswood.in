import styles from "./Footer.module.css";
import Link from "next/link";
import { Camera, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandSection}>
          <h2 className={styles.logo}>
            glasswood<span className={styles.accent}>.in</span>
          </h2>
          <p className={styles.description}>
            Premium glass mirrors with custom wooden frames. Elevate your space with our meticulously crafted collection.
          </p>
        </div>

        <div className={styles.linksSection}>
          <h3 className={styles.heading}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li><Link href="#hero">Home</Link></li>
            <li><Link href="#products">Collection</Link></li>
            <li><Link href="#features">Craftsmanship</Link></li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h3 className={styles.heading}>Contact Us</h3>
          <ul className={styles.contactList}>
            <li>
              <Camera size={18} className={styles.icon} />
              <Link href="https://www.instagram.com/glassnwood.in/" target="_blank">@glassnwood.in</Link>
            </li>
            <li>
              <Mail size={18} className={styles.icon} />
              <a href="mailto:info@glassnwood.in">info@glassnwood.in</a>
            </li>
            <li>
              <MapPin size={18} className={styles.icon} />
              <span>India</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} glasswood.in. All rights reserved.</p>
      </div>
    </footer>
  );
}
