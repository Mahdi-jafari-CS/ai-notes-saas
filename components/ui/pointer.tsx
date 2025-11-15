"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

export function Pointer({
  className,
  style,
  children,
  ...props
}: HTMLMotionProps<"div">): React.ReactNode {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Hide default cursor globally
      document.documentElement.style.cursor = "none";

      const handleMouseMove = (e: MouseEvent) => {
        x.set(e.clientX);
        y.set(e.clientY);

        // Check if hovering over interactive element
        const target = e.target as HTMLElement;
        const isInteractive =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          !!target.closest("button") ||
          !!target.closest("a") ||
          !!target.closest('[role="button"]') ||
          getComputedStyle(target).cursor === "pointer";

        setIsPointer(isInteractive);
      };

      const handleMouseEnter = () => {
        setIsActive(true);
      };

      const handleMouseLeave = () => {
        setIsActive(false);
      };

      // Add event listeners to the entire document
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseenter", handleMouseEnter);
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        // Restore default cursor
        document.documentElement.style.cursor = "";

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseenter", handleMouseEnter);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [x, y]);

  return (
    <>
      {/* Global styles to ensure no double cursor */}
      <style jsx global>{`
        html,
        body,
        * {
          cursor: none !important;
        }

        /* Keep text cursor for inputs and textareas */
        input,
        textarea,
        [contenteditable] {
          cursor: text !important;
        }
      `}</style>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="pointer-events-none fixed z-[9999] transform-[translate(-50%,-50%)]"
            style={{
              top: y,
              left: x,
              ...style,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: isPointer ? 1.1 : 0.7, // Smaller scale values
              opacity: 1,
              rotate: isPointer ? -80 : -70,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 300,
              mass: 0.5,
            }}
            {...props}
          >
            {children || (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="1"
                viewBox="0 0 16 16"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  isPointer ? "text-blue-500" : "text-black",
                  className
                )}
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
              </svg>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
