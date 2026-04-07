// 'use client';

// import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiSun, FiMoon } from 'react-icons/fi';
// import { BsMoonFill, BsSunFill } from 'react-icons/bs';

// export default function ThemeToggle() {
//   const { resolvedTheme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);

//   if (!mounted) return null;

//   const isDark = resolvedTheme === 'dark';

//   return (
//     <button
//       onClick={() => setTheme(isDark ? 'light' : 'dark')}
//       className="relative w-20 h-10 rounded-full backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg flex items-center px-1"
//     >
//       <motion.div
//         layout
//         transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//         className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 shadow-md flex items-center justify-center"
//         animate={{
//           x: isDark ? 36 : 0,
//         }}
//       >
//         {isDark ? (
//           <BsMoonFill className="w-4 h-4 text-blue-400" />
//         ) : (
//           <BsSunFill className="w-4 h-4 text-yellow-500" />
//         )}
//       </motion.div>

//       <div className="absolute left-3 flex items-center">
//         <BsSunFill className="w-4 h-4 text-yellow-400/70" />
//       </div>

//       <div className="absolute right-3 flex items-center">
//         <BsMoonFill className="w-4 h-4 text-blue-400/70" />
//       </div>
//     </button>
//     // <button
//     //   onClick={() => setTheme(isDark ? "light" : "dark")}
//     //   className="border px-3 py-1 rounded"
//     // >
//     //   {isDark ? "☀️" : "🌙"}
//     // </button>
//   );
// }

// // "use client";

// // import { useTheme } from "next-themes";
// // import { useEffect, useState } from 'react';

// // export default function ThemeToggle() {
// //   const { theme, setTheme } = useTheme();
// //   const [mounted, setMounted] = useState(false);

// //   useEffect(() => setMounted(true), []);

// //   if (!mounted) return null; // avoids hydration error

// //   return (

// //   );
// // }


// // 'use client';

// // import { useTheme } from 'next-themes';
// // import { useEffect, useState } from 'react';
// // import { BsSunFill, BsMoonFill } from 'react-icons/bs';

// // export default function ThemeToggle() {
// //   const { resolvedTheme, setTheme } = useTheme();
// //   const [mounted, setMounted] = useState(false);

// //   useEffect(() => setMounted(true), []);

// //   if (!mounted) return null;

// //   const isDark = resolvedTheme === 'dark';

// //   return (
// //     <button
// //       onClick={() => setTheme(isDark ? 'light' : 'dark')}
// //       className="relative flex items-center w-14 h-8 px-1 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors"
// //     >
// //       {/* Toggle circle */}
// //       <span
// //         className={`absolute w-6 h-6 rounded-full bg-white dark:bg-black shadow-md transform transition-transform duration-300 ${
// //           isDark ? 'translate-x-6' : 'translate-x-0'
// //         }`}
// //       />

// //       {/* Icons */}
// //       <BsSunFill className="w-4 h-4 text-yellow-500 z-10 hover:scale-105 active:scale-95" />
// //       <BsMoonFill className="w-4 h-4 text-blue-400 ml-auto z-10 hover:scale-105 active:scale-95" />
// //     </button>
// //   );
// // }


"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
        border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Moon icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-accent-subtle)" }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Sun icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-accent-subtle)" }}>
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}