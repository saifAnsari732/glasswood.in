"use client";

import { useState, useEffect } from "react";
import DesktopHome from "@/components/DesktopHome";
import MobileApp from "@/components/MobileApp";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent layout shifts during hydration
  if (isMobile === null) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F5" }}></div>
    );
  }

  if (isMobile) {
    return <MobileApp />;
  }

  return <DesktopHome />;
}
