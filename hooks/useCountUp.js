"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useCountUp(target, duration = 1800, suffix = "") {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
    const prefix = target.match(/^[^0-9]*/)?.[0] ?? "";
    const trailSuffix = target.match(/[^0-9.]+$/)?.[0] ?? "";

    const isDecimal = target.includes(".");
    const decimals = isDecimal ? (target.split(".")[1]?.replace(/[^0-9]/g, "").length ?? 0) : 0;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * numericTarget;

      setDisplay(prefix + (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + trailSuffix + suffix);

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration, suffix]);

  return { ref, display };
}