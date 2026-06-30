import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Camera, Send } from "lucide-react";
import styles from "./page.module.css";
import BuyOnWhatsAppButton from "@/components/BuyOnWhatsAppButton";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className={styles.detailPage}>
      {/* Background blobs */}
      <div className={styles.bgBlob1}></div>
      <div className={styles.bgBlob2}></div>

      <div className="container">
        {/* Back Link */}
        <Link href="/#products" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Collection</span>
        </Link>

        {/* Widescreen Columns */}
        <div className={styles.gridContainer}>
          
          {/* Left Column: Image with Wood Board Border */}
          <div className={styles.imageCol}>
            <div className={styles.frameWrapper}>
              <div className={styles.woodBorder}>
                <div className={styles.mirrorSurface}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={styles.productImage}
                  />
                  <div className={styles.glare}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Bold Texts & Specs */}
          <div className={styles.infoCol}>
            <span className={styles.categoryBadge}>{product.category} COLLECTION</span>
            
            <h1 className={styles.title}>
              {product.name.split(" ").slice(0, -1).join(" ")} <br />
              <span className="glow-text-teal">{product.name.split(" ").slice(-1)[0]}</span>
            </h1>

            <div className={styles.priceTag}>
              <span className={styles.priceLabel}>ESTIMATED PRICE</span>
              <span className={styles.priceValue}>{product.price}</span>
            </div>

            <p className={styles.description}>
              {product.description}
            </p>

            {/* Specifications list */}
            <div className={styles.specsSection}>
              <h3 className={styles.specsHeading}>SPECIFICATIONS</h3>
              <ul className={styles.specsList}>
                {product.specifications.map((spec, index) => (
                  <li key={index} className={styles.specItem}>
                    <div className={styles.checkIconWrapper}>
                      <Check size={14} className={styles.checkIcon} />
                    </div>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <BuyOnWhatsAppButton product={product} />
              <AddToCartButton product={product} />

              <Link href="/#contact" className="btn-outline">
                <Send size={16} />
                <span>INQUIRE CUSTOM SIZE</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
