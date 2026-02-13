"use client";

import { useEffect, useState, useCallback, RefObject } from "react";
import { UI_CONFIG } from "@/constants";

interface ScrollProgressBarProps {
  scrollRef?: RefObject<HTMLElement | null>;
}

export default function ScrollProgressBar({ scrollRef }: ScrollProgressBarProps) {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef?.current ?? document.documentElement;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const totalScrollableHeight = scrollHeight - clientHeight;

    if (totalScrollableHeight > 0) {
      const scrolled = (scrollTop / totalScrollableHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, scrolled)));
    }
  }, [scrollRef]);

  useEffect(() => {
    handleScroll();

    const target = scrollRef?.current ?? window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [handleScroll, scrollRef]);

  return (
    <div className="fixed left-0 top-0 z-50 w-full" style={{ height: UI_CONFIG.SCROLL_PROGRESS_HEIGHT }}>
      <div className="w-full h-full bg-muted" />
      <div
        className="absolute top-0 left-0 h-full rounded-full transition-all duration-150"
        style={{
          width: `${scrollPercentage}%`,
          backgroundColor: UI_CONFIG.SCROLL_PROGRESS_COLOR
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
