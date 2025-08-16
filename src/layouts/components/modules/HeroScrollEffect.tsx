"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroScrollEffectProps {
  children: React.ReactNode;
  speed?: number; // tốc độ parallax
  blur ?: number,
  maxBlur?: number; // độ mờ tối đa (px)
  effectTypes?: ("parallax" | "blur" | "scale" | "fade" | "rotate" | "translate")[];
}

const HeroScrollEffect: React.FC<HeroScrollEffectProps> = ({
  children,
  speed = 0.5,
  blur = 1,
  maxBlur = 10,
  effectTypes = ["parallax", "blur", "scale"]
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Hiệu ứng parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * -100}%`]);

  // Hiệu ứng scale
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Hiệu ứng blur

  // Hiệu ứng fade
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Hiệu ứng rotate
  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "15deg"]);

  // Hiệu ứng translate X
  const translateX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <motion.div
        style={{
          position: "relative",
          y: effectTypes.includes("parallax") ? y : undefined,
          scale: effectTypes.includes("scale") ? scale : undefined,
          opacity: effectTypes.includes("fade") ? opacity : undefined,
          rotate: effectTypes.includes("rotate") ? rotate : undefined,
          x: effectTypes.includes("translate") ? translateX : undefined,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default HeroScrollEffect;
