import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollPercentage(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 w-full h-1">
      <div className="w-full h-1 bg-muted" />
      <div
        className="absolute top-0 left-0 h-1 rounded-full bg-[#CC3333]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
