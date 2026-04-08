import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

export default function CountStat({ stat, index }) {
  const { ref, display } = useCountUp(stat.value, 1800);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="text-center"
      ref={ref}
    >
      <p className="text-3xl md:text-4xl font-black mb-1" style={{ color: "var(--color-accent-subtle)" }}>
        {display}
      </p>
      <p className="text-sm tracking-wide" style={{ color: "var(--color-text-muted)" }}>{stat.label}</p>
    </motion.div>
  );
}