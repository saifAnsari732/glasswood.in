"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MobileApp.module.css";
import Link from "next/link";
import { 
  Home, Grid, MessageSquare, Star, User, Search, MapPin, Bell,
  Plus, Minus, ShoppingBag, CheckCircle2, Send, Phone, Camera,
  ChevronLeft, ChevronRight, Trash2, MessageCircle, Play
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Hero from "@/components/Hero";
import ReelsShowcase from "@/components/ReelsShowcase";

const REELS = [
  { id: "DaKEqOsCYej", thumb: "/images/islamic_glass_1_1782718887112.jpg" },
  { id: "DaH4I7KCgnM", thumb: "/images/islamic_glass_2_1782718899436.jpg" },
  { id: "DaFvykdCx7l", thumb: "/images/islamic_glass_3_1782718912468.jpg" },
  { id: "DaArWYmhNaT", thumb: "/images/cnc_wood_carving_1782718789445.jpg" },
  { id: "DZ-QWH7SJvP", thumb: "/images/calligraphy_mirror_1782718741704.jpg" },
  { id: "DZ5MCdIyVdz", thumb: "/images/acrylic_signage_1782718768113.jpg" },
  { id: "DZu0jnJSxhz", thumb: "/images/islamic_glass_5_1782718943202.jpg" },
  { id: "DZhlvtJC1cC", thumb: "/images/islamic_glass_6_1782718954650.jpg" },
];

const REVIEWS = [
  {
    name: "Aarav Sharma", location: "Mumbai", stars: 5,
    review: "Stunning craftsmanship. The LED light has a seamless glow and the solid wood frame matches my cabinet perfectly. Safe packing too!"
  },
  {
    name: "Priyanka Patel", location: "Ahmedabad", stars: 5,
    review: "Requested custom size arched mirror. They guided me through dimensions and wood polishing. The result is pure luxury."
  },
  {
    name: "Rohan Varma", location: "Bangalore", stars: 5,
    review: "Extremely clean reflection without any distortion. The natural wood grain shows through beautifully. Will definitely order again."
  },
  {
    name: "Sneha Mehra", location: "Delhi", stars: 5,
    review: "Received my Islamic calligraphy glass mirror. Absolutely breathtaking — adds such elegance to the living space!"
  }
];

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeReel, setActiveReel] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    mirrorType: "Wooden Frame", dimensions: "",
    woodType: "Teak Wood", lightType: "None", message: ""
  });

  const { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice, checkoutWhatsApp, clearCart } = useCart();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setFormSubmitted(true), 800);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "All" || p.category === selectedCategory)
  );

  return (
    <div className={styles.appShell}>
      {/* ──── STICKY HEADER ──── */}
      {activeTab === "Home" && (
        <header className={styles.appHeader}>
          <div className={styles.topHeaderRow}>
            <span className={styles.logoText}>glasswood<span className={styles.accent}>.in</span></span>
            <div className={styles.headerIcons}>
              <button className={styles.cartIconBtn} onClick={() => setIsCartOpen(true)} aria-label="Cart">
                <ShoppingBag size={20} />
                {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
              </button>
              <div className={styles.avatar}>GW</div>
            </div>
          </div>
          <div className={styles.locationBar}>
            <MapPin size={13} className={styles.locIcon} />
            <span className={styles.locText}>Pan-India Delivery — Secure Teak Packaging</span>
          </div>
          <div className={styles.searchBar}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search mirrors (LED, Arch, Carved...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </header>
      )}

      {/* ──── SCREEN CONTENT ──── */}
      <div className={`${styles.appContent} ${activeTab !== "Home" ? styles.paddedTop : ""}`}>
        <AnimatePresence mode="wait">

          {/* ════ HOME SCREEN ════ */}
          {activeTab === "Home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.screenScroll}>

              {/* Main Hero Component */}
              <Hero />

              {/* Promo Banner */}
              <div className={styles.promoBanner}>
                <div className={styles.promoContent}>
                  <span className={styles.promoBadge}>LIMITED OFFER</span>
                  <h3>Teak Wood Mirrors</h3>
                  <p>15% Off + Free Shipping Today</p>
                  <button onClick={() => { setActiveTab("Categories"); setSelectedCategory("Wooden"); }} className={styles.promoBtn}>
                    Shop Now
                  </button>
                </div>
                <div className={styles.promoImg}>
                  <img src="/images/cnc_wood_carving_1782718789445.jpg" alt="Promo" />
                </div>
              </div>

              {/* Categories */}
              <div className={styles.sectionHeader}>
                <h4>Shop by Category</h4>
                <button onClick={() => setActiveTab("Categories")} className={styles.viewAllBtn}>View All</button>
              </div>
              <div className={styles.categoriesRow}>
                {["All", "LED", "Wooden", "Modern"].map(cat => (
                  <button key={cat} onClick={() => { setActiveTab("Categories"); setSelectedCategory(cat); }} className={styles.categoryItem}>
                    <div className={`${styles.categoryIconCircle} ${selectedCategory === cat ? styles.activeCatCircle : ""}`}>
                      <Grid size={18} />
                    </div>
                    <span>{cat}</span>
                  </button>
                ))}
              </div>

              {/* Today's Offers (horizontal scroll) */}
              <div className={styles.sectionHeader}>
                <h4>Today's Offers 🔥</h4>
              </div>
              <div className={styles.horizontalScrollList}>
                {products.slice(0, 4).map(product => (
                  <Link href={`/product/${product.id}`} key={product.id} className={styles.horizontalCard}>
                    <div className={styles.cardImageWrapper}>
                      <img src={product.image} alt={product.name} />
                      <span className={styles.discountBadge}>15% OFF</span>
                    </div>
                    <div className={styles.cardInfo}>
                      <h5>{product.name}</h5>
                      <p className={styles.category}>{product.category}</p>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>{product.price}</span>
                        <button
                          className={styles.plusBtn}
                          onClick={e => { e.preventDefault(); addToCart(product); }}
                          aria-label="Add to cart"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Instagram Reels Section */}
              <ReelsShowcase />

              {/* Popular Collection 2-column grid */}
              <div className={styles.sectionHeader}>
                <h4>Popular Collection</h4>
                <button onClick={() => setActiveTab("Categories")} className={styles.viewAllBtn}>View All</button>
              </div>
              <div className={styles.verticalGrid}>
                {products.map(product => (
                  <Link href={`/product/${product.id}`} key={product.id} className={styles.verticalCard}>
                    <div className={styles.verticalCardImageWrapper}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className={styles.verticalCardInfo}>
                      <h5>{product.name}</h5>
                      <p className={styles.category}>{product.category}</p>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>{product.price}</span>
                        <button
                          className={styles.miniAddBtn}
                          onClick={e => { e.preventDefault(); addToCart(product); }}
                          aria-label="Add to cart"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Craft Process strip */}
              <div className={styles.processStrip}>
                <h4>How We Craft</h4>
                <div className={styles.processSteps}>
                  {[
                    { icon: "🪵", title: "Timber Sourced", sub: "Aged sustainable teak" },
                    { icon: "🔧", title: "Artisan Carved", sub: "CNC & hand finishing" },
                    { icon: "🪞", title: "Glass Mounted", sub: "6mm HD silver coat" },
                    { icon: "📦", title: "Packed & Shipped", sub: "Zero-damage guarantee" }
                  ].map((step, i) => (
                    <div key={i} className={styles.processStep}>
                      <div className={styles.stepEmoji}>{step.icon}</div>
                      <h6>{step.title}</h6>
                      <small>{step.sub}</small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews strip */}
              <div className={styles.sectionHeader}>
                <h4>⭐ Client Reviews</h4>
                <button onClick={() => setActiveTab("Reviews")} className={styles.viewAllBtn}>View All</button>
              </div>
              <div className={styles.horizontalReviews}>
                {REVIEWS.map((rev, i) => (
                  <div key={i} className={styles.miniReviewCard}>
                    <div className={styles.miniStars}>{"★".repeat(rev.stars)}</div>
                    <p>"{rev.review.slice(0, 80)}..."</p>
                    <span>{rev.name}, {rev.location}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className={styles.whatsappCta}>
                <h4>Need a Custom Mirror?</h4>
                <p>Chat with our artisans for bespoke sizing & design.</p>
                <a href="https://wa.me/919162732242?text=Hello%20glasswood.in!%20I%20need%20a%20custom%20mirror." target="_blank" rel="noopener noreferrer" className={styles.whatsappCtaBtn}>
                  <Phone size={16} /> Chat on WhatsApp
                </a>
              </div>

              <div style={{ height: "2rem" }} />
            </motion.div>
          )}

          {/* ════ CATEGORIES SCREEN ════ */}
          {activeTab === "Categories" && (
            <motion.div key="categories" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.screenScroll}>
              <div className={styles.screenHeader}>
                <h2>Our Collection</h2>
                <p>Browse handcrafted mirrors</p>
              </div>
              <div className={styles.tabFilters}>
                {["All", "LED", "Wooden", "Modern"].map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`${styles.tabFilterBtn} ${selectedCategory === cat ? styles.activeTabFilter : ""}`}>
                    {cat}
                  </button>
                ))}
              </div>
              <div className={styles.subSearch}>
                <Search size={15} />
                <input type="text" placeholder="Filter by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className={styles.verticalGrid}>
                {filteredProducts.map(product => (
                  <Link href={`/product/${product.id}`} key={product.id} className={styles.verticalCard}>
                    <div className={styles.verticalCardImageWrapper}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className={styles.verticalCardInfo}>
                      <h5>{product.name}</h5>
                      <p className={styles.category}>{product.category}</p>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>{product.price}</span>
                        <button className={styles.miniAddBtn} onClick={e => { e.preventDefault(); addToCart(product); }}><Plus size={12} /></button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ height: "2rem" }} />
            </motion.div>
          )}

          {/* ════ REELS SCREEN ════ */}
          {activeTab === "Reels" && (
            <motion.div key="reels" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.screenScroll}>
              <div className={styles.screenHeader}>
                <h2>Instagram Reels</h2>
                <p>Latest from <a href="https://www.instagram.com/glassnwood.in/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-teal)" }}>@glassnwood.in</a></p>
              </div>
              <div className={styles.reelsGrid}>
                {REELS.map(reel => (
                  <div key={reel.id} className={styles.reelGridCard} onClick={() => setActiveReel(reel.id)}>
                    <img src={reel.thumb} alt="Reel" />
                    <div className={styles.reelPlayOverlay}><Play size={24} fill="#fff" color="#fff" /></div>
                  </div>
                ))}
              </div>
              <div style={{ height: "2rem" }} />
            </motion.div>
          )}

          {/* ════ CART SCREEN ════ */}
          {activeTab === "Cart" && (
            <motion.div key="cart" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.screenScroll}>
              <div className={styles.screenHeader}>
                <h2>My Cart</h2>
                <p>{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
              </div>
              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <ShoppingBag size={52} opacity={0.2} />
                  <p>Your cart is empty</p>
                  <button onClick={() => setActiveTab("Categories")} className={styles.browseBtn}>Browse Collection</button>
                </div>
              ) : (
                <>
                  <div className={styles.cartList}>
                    {cart.map(item => (
                      <div key={item.id} className={styles.mobileCartItem}>
                        <Link href={`/product/${item.id}`}>
                          <img src={item.image} alt={item.name} className={styles.mobileCartImage} />
                        </Link>
                        <div className={styles.mobileCartInfo}>
                          <h5>{item.name}</h5>
                          <span className={styles.category}>{item.category}</span>
                          <span className={styles.price}>{item.price}</span>
                          <div className={styles.qtyControls}>
                            <button className={styles.qtyBtnSm} onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={11} /></button>
                            <span className={styles.qtyNum}>{item.quantity}</span>
                            <button className={styles.qtyBtnSm} onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={11} /></button>
                            <button className={styles.removeItemBtn} onClick={() => removeFromCart(item.id)}><Trash2 size={13} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.mobileCartFooter}>
                    <div className={styles.totalLine}>
                      <span>Total ({totalItems} items)</span>
                      <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                    </div>
                    <button className={styles.whatsappOrderBtn} onClick={checkoutWhatsApp}>
                      <MessageCircle size={18} /> Order via WhatsApp
                    </button>
                    <button className={styles.clearCartBtn} onClick={clearCart}>Clear Cart</button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ════ INQUIRY FORM SCREEN ════ */}
          {activeTab === "Inquiry" && (
            <motion.div key="inquiry" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.screenScroll}>
              <div className={styles.screenHeader}>
                <h2>Custom Mirror</h2>
                <p>Tell us your exact requirements</p>
              </div>
              <div className={styles.mobileFormWrapper}>
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className={styles.mobileForm}>
                    {[
                      { label: "Your Name", type: "text", placeholder: "Rahul Sen", key: "name" },
                      { label: "Email Address", type: "email", placeholder: "rahul@example.com", key: "email" },
                      { label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", key: "phone" },
                      { label: "Dimensions (H × W in inches)", type: "text", placeholder: "e.g. 72 × 36", key: "dimensions" },
                    ].map(field => (
                      <div key={field.key} className={styles.inputGroup}>
                        <label>{field.label}</label>
                        <input type={field.type} placeholder={field.placeholder} required={field.key !== "dimensions"}
                          value={(formData as any)[field.key]}
                          onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                        />
                      </div>
                    ))}
                    <div className={styles.inputGroup}>
                      <label>Mirror Type</label>
                      <select value={formData.mirrorType} onChange={e => setFormData({ ...formData, mirrorType: e.target.value })}>
                        <option>Wooden Frame Only</option>
                        <option>LED Glass Mirror</option>
                        <option>LED with Wooden Frame</option>
                        <option>Minimalist Frameless</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Wood Type</label>
                      <select value={formData.woodType} onChange={e => setFormData({ ...formData, woodType: e.target.value })}>
                        <option>Teak Wood (Rich Golden-Brown)</option>
                        <option>White Oak Wood (Contemporary Light)</option>
                        <option>Walnut Wood (Dark Premium)</option>
                        <option>No Wood (LED Frameless)</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Additional Notes</label>
                      <textarea rows={3} placeholder="Any special design instructions..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className={styles.textarea}
                      />
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                      <Send size={15} /> Submit Custom Request
                    </button>
                    <a href="https://wa.me/919162732242?text=Hi%20glasswood.in!%20I%20need%20a%20custom%20mirror." target="_blank" rel="noopener noreferrer" className={styles.whatsappAltBtn}>
                      <Phone size={15} /> Direct WhatsApp Instead
                    </a>
                  </form>
                ) : (
                  <div className={styles.successState}>
                    <CheckCircle2 size={52} className={styles.successIcon} />
                    <h3>Inquiry Lodged!</h3>
                    <p>Custom <strong>{formData.mirrorType}</strong> ({formData.dimensions || "standard"}) submitted.</p>
                    <p className={styles.successSub}>Our artisan will send sketch sheets within 24 hours.</p>
                    <button onClick={() => setFormSubmitted(false)} className={styles.resetBtn}>New Design Specs</button>
                  </div>
                )}
              </div>
              <div style={{ height: "2rem" }} />
            </motion.div>
          )}

          {/* ════ REVIEWS SCREEN ════ */}
          {activeTab === "Reviews" && (
            <motion.div key="reviews" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.screenScroll}>
              <div className={styles.screenHeader}>
                <h2>Client Reviews</h2>
                <p>Verified feedback from Indian homes</p>
              </div>
              <div className={styles.reviewsList}>
                {REVIEWS.map((rev, i) => (
                  <div key={i} className={styles.reviewCard}>
                    <div className={styles.miniStars}>{Array.from({ length: rev.stars }).map((_, j) => <span key={j} style={{ color: "var(--accent-gold)" }}>★</span>)}</div>
                    <p className={styles.reviewText}>"{rev.review}"</p>
                    <div className={styles.authorRow}>
                      <span className={styles.authorName}>{rev.name}</span>
                      <span className={styles.authorLoc}>({rev.location})</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ height: "2rem" }} />
            </motion.div>
          )}

          {/* ════ PROFILE SCREEN ════ */}
          {activeTab === "Profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.screenScroll}>
              <div className={styles.profileHeader}>
                <div className={styles.profileAvatarLarge}>GW</div>
                <h2>glasswood.in</h2>
                <p>Premium Glass Mirrors & Sustainable Teak Frames</p>
              </div>
              <div className={styles.profileLinks}>
                <div className={styles.linkGroup}>
                  <h5>INSTAGRAM DMs</h5>
                  <p>Inquire & request layout sketches</p>
                  <a href="https://www.instagram.com/glassnwood.in/" target="_blank" rel="noopener noreferrer" className={styles.profileButton}>
                    <Camera size={15} /> DM @glassnwood.in
                  </a>
                </div>
                <div className={styles.linkGroup}>
                  <h5>WHATSAPP ORDERS</h5>
                  <p>Direct cart orders or custom size queries</p>
                  <a href="https://wa.me/919162732242" target="_blank" rel="noopener noreferrer" className={styles.profileButton}>
                    <Phone size={15} /> +91 91627 32242
                  </a>
                </div>
                <div className={styles.infoRow}><span>Dispatch Hub</span><strong>India (Pan-India)</strong></div>
                <div className={styles.infoRow}><span>Email</span><strong>info@glasswood.in</strong></div>
              </div>
              <div style={{ height: "2rem" }} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ──── REEL MODAL ──── */}
      <AnimatePresence>
        {activeReel && (
          <motion.div className={styles.reelModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className={styles.reelModalClose} onClick={() => setActiveReel(null)}><ChevronLeft size={20} /> Close</button>
            <div className={styles.reelEmbed}>
              <iframe
                src={`https://www.instagram.com/reel/${activeReel}/embed/`}
                frameBorder="0"
                scrolling="no"
                allowtransparency
                allow="encrypted-media"
                style={{ width: "100%", height: "600px", border: "none" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──── FLOATING WHATSAPP FAB ──── */}
      <a href="https://wa.me/919162732242" target="_blank" rel="noopener noreferrer" className={styles.floatingActionBtn} aria-label="WhatsApp">
        <Phone size={22} fill="#fff" />
      </a>

      {/* ──── BOTTOM TAB BAR ──── */}
      <nav className={styles.bottomTabBar}>
        {[
          { id: "Home", icon: <Home size={20} />, label: "Home" },
          { id: "Categories", icon: <Grid size={20} />, label: "Collection" },
          { id: "Cart", icon: (
              <span style={{ position: "relative", display: "inline-flex" }}>
                <ShoppingBag size={20} />
                {totalItems > 0 && <span className={styles.tabCartBadge}>{totalItems}</span>}
              </span>
            ), label: "Cart"
          },
          { id: "Reels", icon: <Camera size={20} />, label: "Reels" },
          { id: "Profile", icon: <User size={20} />, label: "Profile" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${styles.tabItem} ${activeTab === tab.id ? styles.activeTab : ""}`}>
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ──── CART DRAWER (slides in from right) ──── */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
