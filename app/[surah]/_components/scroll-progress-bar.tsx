"use client";

import { useEffect, useState, useCallback } from "react";
import { UI_CONFIG } from "@/constants";

export default function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const totalScrollableHeight = scrollHeight - clientHeight;

    if (totalScrollableHeight > 0) {
      const scrolled = (scrollTop / totalScrollableHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, scrolled)));
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="fixed left-0 top-0 z-[100] w-full"
      style={{ height: UI_CONFIG.SCROLL_PROGRESS_HEIGHT }}
    >
      <div className="w-full h-full bg-muted" />
      <div
        className="absolute top-0 left-0 h-full rounded-full transition-all duration-150"
        style={{
          width: `${scrollPercentage}%`,
          backgroundColor: UI_CONFIG.SCROLL_PROGRESS_COLOR,
        }}
        role="progressbar"
        aria-valuenow={Math.round(scrollPercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="تقدم القراءة"
      />
    </div>
  );
}
